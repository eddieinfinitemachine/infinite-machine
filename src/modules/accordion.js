// Reusable collapsible. Element-based: pass the clickable head + the content to
// collapse, plus an optional chevron to rotate. Collapsed by default. Returns
// { open, collapse, toggle } or null if head/content are missing.
//
// Height animates 0 ↔ scrollHeight, then releases to `auto` while open so the
// content can reflow (e.g. accessory filters showing/hiding cards). overflow is
// `hidden` only DURING the animation and restored to the element's natural value
// when open — otherwise a tall/scrollable list (e.g. accessories) would stay
// clipped, hiding lower cards. The chevron rotates 0° ↔ 180°.

export function initAccordion(head, content, { startOpen = false, chevron = null } = {}) {
  if (!head || !content) return null;

  content.style.transition = 'height 0.3s ease-out';
  if (chevron) chevron.style.transition = 'transform 0.3s ease';
  head.style.cursor = 'pointer';

  let isOpen = !!startOpen;
  const rotate = () => {
    if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  // Initial state — open shows natural overflow, collapsed clips to 0 height.
  content.style.height = isOpen ? 'auto' : '0px';
  content.style.overflow = isOpen ? '' : 'hidden';
  rotate();

  function open() {
    // Clip during the animation, measure natural height, snap to 0, force a
    // reflow, then animate to target. The reflow guarantees the browser
    // registers the 0px start so the transition runs (instead of snapping).
    content.style.overflow = 'hidden';
    content.style.height = 'auto';
    const target = content.scrollHeight;
    content.style.height = '0px';
    void content.offsetHeight; // force reflow
    content.style.height = target + 'px';
    isOpen = true;
    rotate();

    const onEnd = (e) => {
      // Ignore transitionend bubbling up from children (cards/swatches with
      // their own transitions) — only the content's own height settle counts.
      // Without this guard a child event fires early and snaps it open mid-animation.
      if (e.target !== content || e.propertyName !== 'height') return;
      content.removeEventListener('transitionend', onEnd);
      if (isOpen) {
        content.style.height = 'auto'; // reflow while open
        content.style.overflow = ''; // restore natural overflow so nothing is clipped
      }
    };
    content.addEventListener('transitionend', onEnd);
  }

  function collapse() {
    content.style.overflow = 'hidden'; // clip again before collapsing
    content.style.height = content.scrollHeight + 'px'; // auto → fixed px to animate
    void content.offsetHeight; // force reflow
    content.style.height = '0px';
    isOpen = false;
    rotate();
  }

  function toggle() {
    isOpen ? collapse() : open();
  }

  head.addEventListener('click', toggle);

  return { open, collapse, toggle };
}
