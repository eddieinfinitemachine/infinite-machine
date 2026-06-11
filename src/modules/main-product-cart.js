import { onVariantChange, setVariant } from './variant-observer.js';
import { setLineForProduct, getCart, onSessionChange, getCurrentConfigSessionId } from '../lib/cart.js';

// Keeps the main product line in cart synced with URL variant. Two triggers:
//   - URL variant changes (user picks Black/Silver) → setLineForProduct
//     updates current session's bike line.
//   - Session changes (user clicks "Edit" on a different config in drawer,
//     or "Add another configuration") → re-align URL to that config's
//     existing bike variant (or default for a fresh session).

export function initMainProductCart(config, products) {
  if (!products.main) return;
  const mainHandle = products.main.handle;
  const defaultVariantId = config.defaultVariantId;

  onVariantChange((numericId) => {
    const targetGid = `gid://shopify/ProductVariant/${numericId}`;
    setLineForProduct(mainHandle, targetGid);
  });

  onSessionChange((newSessionId) => {
    const cart = getCart();
    const bikeLine = cart?.lines.find(
      (l) =>
        l.merchandise.product.handle === mainHandle &&
        l.attributesByKey?._config_id === newSessionId
    );
    if (bikeLine) {
      // Existing config — sync URL to its bike variant. variant-observer will
      // fire and setLineForProduct will no-op (line already correct).
      const numericId = bikeLine.merchandise.id.split('/').pop();
      setVariant(numericId);
    } else if (defaultVariantId) {
      // New config — explicitly add the bike. Can't rely on the variant-fire
      // chain because URL variant might ALREADY equal defaultVariantId (user
      // was on the default before clicking "Add another"), in which case
      // setVariant is a no-op and the variant handler never runs.
      const defaultGid = `gid://shopify/ProductVariant/${defaultVariantId}`;
      setLineForProduct(mainHandle, defaultGid);
      setVariant(defaultVariantId); // also aligns URL (no-op if already default)
    }
  });
}
