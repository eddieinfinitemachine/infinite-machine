import '@shopify/ui-extensions/preact';
import { render } from 'preact';

/**
 * Discount details panel for the Olto bundle Function.
 *
 * Deliberately has no inputs. The tiers, component sets and amounts live in
 * extensions/olto-bundle-discount and are asserted by its tests — putting them
 * behind merchant-editable fields would let the discount drift away from what
 * src/infinite/ui.js advertises, which is the exact bug this whole change set
 * exists to close.
 *
 * It exists because Shopify renders the discount details page from this
 * target. Without it, choosing "Olto bundle discount" under Create discount
 * lands on the app's (empty) page and the discount cannot be created at all.
 */
export default async () => {
  render(<Settings />, document.body);
};

const TIERS = [
  ['Olto Commuter', 'Sidewalls, Charging Dock, Phone Mount, Water Bottle Holder, Outdoor Cover', '−$126'],
  ['Olto Cargo', 'Sidewalls, Charging Dock, Phone Mount, Charger Bag, Rear Rack, Rear Basket, Soft Bag, Side Mounting Plate, Accessory Plate, Center Stand', '−$320'],
  ['Olto Max', 'Everything in Cargo, plus Water Bottle Holder and Super Charger', '−$416'],
];

function Settings() {
  return (
    <s-section heading="Olto bundle pricing">
      <s-stack gap="base">
        <s-text>
          Applies automatically when an Olto and every component of a tier are in
          the cart. Partial sets get nothing, and only the largest matching tier
          applies.
        </s-text>
        {TIERS.map(([name, items, amount]) => (
          <s-box key={name} padding="base" borderWidth="base" borderRadius="base">
            <s-stack gap="tight">
              <s-stack direction="inline" gap="base">
                <s-text fontWeight="bold">{name}</s-text>
                <s-text fontWeight="bold">{amount}</s-text>
              </s-stack>
              <s-text color="subdued">{items}</s-text>
            </s-stack>
          </s-box>
        ))}
        <s-text color="subdued">
          Amounts are fixed in the function, not editable here, so they cannot
          drift from what the configurator advertises. To change them, edit
          extensions/olto-bundle-discount and redeploy.
        </s-text>
      </s-stack>
    </s-section>
  );
}
