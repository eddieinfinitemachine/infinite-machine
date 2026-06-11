// Reusable accordion. Discovers `[data-step-${name}="head|content|meta"]` trio
// and returns { open, collapse, toggle } — or null if any of the three is
// missing (safe to call on pages without the section).

export function initAccordion(name, { startOpen = true } = {}) {
  const head = document.querySelector(`[data-step-${name}="head"]`);
  const content = document.querySelector(`[data-step-${name}="content"]`);
  const meta = document.querySelector(`[data-step-${name}="meta"]`);

  if (!head || !content || !meta) return null;

  content.style.overflow = 'hidden';
  content.style.transition = 'height 0.3s ease-out';
  meta.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out';

  let isOpen = startOpen;

  if (isOpen) {
    meta.style.opacity = '0';
    meta.style.visibility = 'hidden';
  } else {
    content.style.height = '0px';
    meta.style.opacity = '1';
    meta.style.visibility = 'visible';
  }

  function open() {
    content.style.height = 'auto';
    const scrollHeight = content.scrollHeight;
    content.style.height = '0px';
    requestAnimationFrame(() => {
      content.style.height = scrollHeight + 'px';
    });
    meta.style.opacity = '0';
    meta.style.visibility = 'hidden';
    isOpen = true;
  }

  function collapse() {
    if (!isOpen) return;
    content.style.height = '0px';
    meta.style.opacity = '1';
    meta.style.visibility = 'visible';
    isOpen = false;
  }

  function toggle() {
    isOpen ? collapse() : open();
  }

  head.addEventListener('click', toggle);

  return { open, collapse, toggle };
}
