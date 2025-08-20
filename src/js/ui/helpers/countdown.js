
export function initCountdown(el, endsAt, options = {}) {
  if (!(el instanceof HTMLElement)) {
    return () => {};
  }
  const target = endsAt instanceof Date ? endsAt : new Date(endsAt);
  if (isNaN(target.getTime())) {
    return () => {};
  }

  const {
    urgentMs = 60 * 60 * 1000,
    endedText = 'Auction ended',
    format,
    urgentClass = 'text-warning',
    endedClass = 'text-danger',
  } = options;

  function defaultFormat(d, h, m, s) {
    if (d > 0) {
      return `${d}d ${h}h ${m}m`;
    }
    if (h > 0) {
      return `${h}h ${m}m ${s}s`;
    }
    return `${m}m ${s}s`;
  }

  function tick() {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      el.textContent = endedText;
      el.classList.add(endedClass);
      clearInterval(timerId);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const label = typeof format === 'function' ? format(d, h, m, s) : defaultFormat(d, h, m, s);
    el.textContent = label;

    if (diff < urgentMs) {
      el.classList.add(urgentClass);
    }
  }

  // Initial update and start interval
  tick();
  const timerId = setInterval(tick, 1000);

  // Return cleanup
  return () => clearInterval(timerId);
}
