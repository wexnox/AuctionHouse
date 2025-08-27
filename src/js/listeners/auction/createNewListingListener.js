import { createNewListing } from '../../api/listings/createNewListing.js';
import { displayMessage } from '@/js/ui/common/displayMessage.js';

/**
 * Parses tags from a string.
 * @param raw
 * @returns {string[]}
 */

function parseTags(raw) {
  // Accept comma or whitespace separated, normalize to unique lowercased strings, max 10 tags
  const arr = (raw || '')
    .toString()
    .split(/[,\n\r\t ]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.toLowerCase())
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 10);
  // Remove tags that are too long or contain disallowed characters
  return arr.filter((t) => t.length <= 24 && /^[\p{L}\p{N}_-]+$/u.test(t));
}

/**
 * Checks if a date is in the future.
 * @param isoString
 * @returns {boolean}
 */

function isFutureDate(isoString) {
  const d = new Date(isoString);
  return !isNaN(d.getTime()) && d.getTime() > Date.now();
}

/**
 * Removes empty arrays from the payload.
 * @param payload
 * @returns {*}
 */

function pruneEmptyArrays(payload) {
  const out = { ...payload };
  if (!out.tags?.length) {
    delete out.tags;
  }
  if (!out.media?.length) {
    delete out.media;
  }
  return out;
}

/**
 * Submits a new listing.
 * @param form
 * @returns {Promise<void>}
 */

async function submitListing({ form }) {
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn?.setAttribute('disabled', 'true');

  try {
    const fd = new FormData(form);
    const title = (fd.get('title') || '').toString().trim();
    const description = (fd.get('description') || '').toString().trim() || undefined;
    const endsAt = fd.get('endsAt');
    const tags = parseTags(fd.get('tags'));

    if (!title) {
      throw new Error('Title is required');
    }
    if (!isFutureDate(endsAt)) {
      throw new Error('Deadline must be a future date/time');
    }

    // Parse URLs
    const rawUrls = (fd.get('mediaUrls') || '').toString();
    const media = rawUrls
      .split(/\r?\n|[,\s]+/)
      .map((s) => s.trim())
      .filter((s) => /^https?:\/\//i.test(s))
      .filter((v, i, a) => a.indexOf(v) === i) // unique
      .slice(0, 8);

    if (media.length > 8) {
      throw new Error(`Maximum 8 images allowed. You currently have ${media.length}.`);
    }

    const listing = pruneEmptyArrays({ title, description, endsAt: new Date(endsAt), tags, media });

    const response = await createNewListing(listing);
    console.log('Server Response:', response);

    displayMessage('success', 'Listing created successfully! Redirecting to profile...');
    setTimeout(() => {
      location.href = '../../pages/profile/index.html';
    }, 1500);
  } catch (e) {
    console.error(e);
    displayMessage('danger', e.message || 'Failed to create listing');
  } finally {
    submitBtn?.removeAttribute('disabled');
  }
}

/**
 * Initializes the create listing page.
 */

export function initCreateListingPage() {
  const form = document.getElementById('createListingForm');
  if (!form) {
    return;
  }
  if (form.dataset.mediaInit === 'true') {
    return; // prevent double init
  }
  form.dataset.mediaInit = 'true';

  // URL-only mode: no file uploader is mounted
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitListing({ form });
  });
}