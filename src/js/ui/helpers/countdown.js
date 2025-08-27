
/**
 * Normalize a date value to a Date object.
 * @param value
 * @returns {Date|Date}
 */

function normalizeDate(value) {
  return value instanceof Date ? value : new Date(value);
}

/**
 * Compute the time remaining in days, hours, minutes, and seconds.
 * @param target
 * @param now
 * @returns {{d: number, h: number, m: number, s: number, diff: number}|null}
 */

function computeParts(target, now = new Date()) {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return null;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, diff };
}

/**
 * Default formatter used for live labels.
 */

function defaultFormat(d, h, m, s) {
  if (d > 0) {
    return `${d}d ${h}h ${m}m`;
  }
  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }
  return `${m}m ${s}s`;
}

/**
 * Initialize a countdown timer.
 * @param elOrEndsAt
 * @param maybeEndsAt
 * @param maybeOptions
 * @returns {function(): void}
 */

function timeRemaining(elOrEndsAt, maybeEndsAt, maybeOptions) {
  // Mode 1: compute-only when first argument is not an HTMLElement
  if (!(elOrEndsAt instanceof HTMLElement)) {
    const endsAt = elOrEndsAt;
    const target = normalizeDate(endsAt);
    if (isNaN(target.getTime())) {
      return null;
    }
    const parts = computeParts(target);
    if (!parts) {
      return null;
    }
    const { d, h, m } = parts;
    const short = `${d ? d + 'd ' : ''}${h}h ${m}m`.trim();
    const long = `${d} day(s) ${h} hour(s) ${m} minute(s)`;
    return { short, long };
  }

  // Mode 2: live countdown update when first argument is HTMLElement
  const el = elOrEndsAt;
  const endsAt = maybeEndsAt;
  const options = maybeOptions || {};

  const target = normalizeDate(endsAt);
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

  function tick() {
    const parts = computeParts(target);
    if (!parts) {
      el.textContent = endedText;
      el.classList.add(endedClass);
      clearInterval(timerId);
      return;
    }
    const { d, h, m, s, diff } = parts;
    const label = typeof format === 'function' ? format(d, h, m, s) : defaultFormat(d, h, m, s);
    el.textContent = label;
    if (diff < urgentMs) {
      el.classList.add(urgentClass);
    }
  }

  tick();
  const timerId = setInterval(tick, 1000);
  return () => clearInterval(timerId);
}

/**
 * Initialize a countdown timer.
 * @param el
 * @param endsAt
 * @param options
 * @returns {function(): void}
 */

// Public named APIs (no default export — avoids redundancy)
export function initCountdown(el, endsAt, options = {}) {
  return timeRemaining(el, endsAt, options);
}

/**
 * Compute time left
 * @param endsAt
 * @returns {(function(): void)|null}
 */

export function computeTimeLeft(endsAt) {
  return timeRemaining(endsAt) || null;
}
