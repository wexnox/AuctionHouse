import { computeTimeLeft } from '@/js/ui/helpers/countdown.js';

/**
 * Creates HTML cards for auction listings.
 * @param listings
 * @param container
 * @param options
 */

export default function createHtmlCards(listings, container, options = {}) {
  const layout = options.layout || 'grid';

  // Landing page alternating row layout
  if (layout === 'row') {
    const list = document.createElement('div');
    list.className = 'vstack gap-5 auction-list';

    listings.forEach((listing, index) => {
      const card = document.createElement('div');
      card.className = 'card auction-row shadow-lg';

      const inner = document.createElement('div');
      inner.className = 'row g-0 align-items-stretch';

      const imgCol = document.createElement('div');
      imgCol.className = 'col-md-5';
      const bodyCol = document.createElement('div');
      bodyCol.className = 'col-md-7';

      // Alternate image position on larger screens
      if (index % 2 === 1) {
        imgCol.classList.add('order-md-2');
        bodyCol.classList.add('order-md-1');
      }

      // Image section
      const imgWrap = document.createElement('div');
      imgWrap.className = 'image-wrap position-relative h-100';

      const imgLink = document.createElement('a');
      imgLink.href = `/pages/listings/details.html?id=${listing.id}`;

      const img = document.createElement('img');
      img.src = listing.media?.[0] || '../../src/images/no-image.jpeg';
      img.alt = listing.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.fetchPriority = 'low';
      img.width = 800; // reserve space to reduce CLS
      img.height = 280;
      img.onerror = () => {
        if (img.dataset.fallback !== '1') {
          img.dataset.fallback = '1';
          img.src = '../../src/images/no-image.jpeg';
        }
      };

      imgLink.appendChild(img);

      const isEnded = new Date(listing.endsAt) - new Date() <= 0;
      if (isEnded) {
        const status = document.createElement('span');
        status.className = 'status-badge badge bg-secondary text-white';
        status.textContent = 'Ended';
        status.setAttribute('aria-label', 'Auction ended');
        imgWrap.appendChild(status);
      }

      imgWrap.appendChild(imgLink);
      imgCol.appendChild(imgWrap);

      // Body/content section
      const body = document.createElement('div');
      body.className = 'card-body d-flex flex-column h-100';

      const titleLink = document.createElement('a');
      titleLink.href = `/pages/listings/details.html?id=${listing.id}`;
      titleLink.className = 'text-decoration-none text-dark';

      const title = document.createElement('h5');
      title.className = 'fw-bold text-dark mb-2 text-truncate';
      title.title = listing.title;
      title.textContent = truncate(listing.title, 70);
      titleLink.appendChild(title);

      // Tags
      const tagsWrap = document.createElement('div');
      tagsWrap.className = 'd-flex flex-wrap gap-1 mb-2';
      const tags = Array.isArray(listing.tags) ? listing.tags.filter(Boolean) : [];
      tags.slice(0, 5).forEach((tg) => {
        const a = document.createElement('a');
        a.href = `/pages/listings/browse.html?_tag=${encodeURIComponent(tg)}`;
        a.className = 'badge bg-light text-dark border';
        a.setAttribute('aria-label', `Filter by tag ${tg}`);
        a.textContent = `#${tg}`;
        tagsWrap.appendChild(a);
      });

      const desc = document.createElement('p');
      desc.className = 'card-text small text-muted text-secondary mb-2';
      desc.textContent = listing.description || 'No description available.';

      const footer = document.createElement('div');
      footer.className = 'd-flex flex-column gap-2 mt-auto';

      const hr = document.createElement('hr');
      hr.className = 'my-2 opacity-50';

      const timeInfo = computeTimeLeft(listing.endsAt);
      const time = document.createElement('span');
      if (timeInfo) {
        time.className = 'badge bg-light text-dark border time-badge';
        time.textContent = `Ends: ${timeInfo.short}`;
        time.title = timeInfo.long;
        time.setAttribute('aria-label', `Ends in ${timeInfo.long}`);
      } else {
        time.className = 'badge bg-secondary text-white time-badge';
        time.textContent = 'Auction ended';
        time.setAttribute('aria-label', 'Auction ended');
      }

      const button = document.createElement('a');
      button.href = `/pages/listings/details.html?id=${listing.id}`;
      button.className = 'btn load-more-btn align-self-start';
      button.textContent = 'Read More';

      footer.append(time, hr, button);
      body.append(titleLink, tagsWrap, desc, footer);
      bodyCol.appendChild(body);

      inner.append(imgCol, bodyCol);
      card.appendChild(inner);
      list.appendChild(card);
    });

    container.append(list);
    return;
  }

  const row = document.createElement('div');
  row.className = 'row gy-4';

  listings.forEach((listing) => {
    const col = document.createElement('div');
    col.className = 'col-sm-12 col-lg-4 d-flex';

    const card = document.createElement('div');
    card.className = 'card auction-card shadow-lg w-100 d-flex flex-column';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'position-relative';

    const imgLink = document.createElement('a');
    imgLink.href = `/pages/listings/details.html?id=${listing.id}`;

    const img = document.createElement('img');
    img.className = 'card-img-top rounded-top';
    img.src = listing.media?.[0] || '../../src/images/no-image.jpeg';
    img.alt = listing.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.fetchPriority = 'low';
    img.width = 400; // reserve space
    img.height = 220;
    img.onerror = () => {
      if (img.dataset.fallback !== '1') {
        img.dataset.fallback = '1';
        img.src = '../../src/images/no-image.jpeg';
      }
    };

    imgLink.appendChild(img);

    // Status badge if auction has ended
    const isEnded = new Date(listing.endsAt) - new Date() <= 0;
    if (isEnded) {
      const status = document.createElement('span');
      status.className = 'status-badge badge bg-secondary text-white';
      status.textContent = 'Ended';
      status.setAttribute('aria-label', 'Auction ended');
      imgWrap.appendChild(status);
    }

    imgWrap.appendChild(imgLink);

    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column justify-content-between flex-grow-1';

    const titleLink = document.createElement('a');
    titleLink.href = `/pages/listings/details.html?id=${listing.id}`;
    titleLink.className = 'text-decoration-none text-dark';

    const title = document.createElement('h5');
    title.className = 'card-title fw-bold text-dark text-center text-truncate mb-2';
    title.title = listing.title;
    title.textContent = truncate(listing.title, 60); // max title length

    titleLink.appendChild(title);

    // Tags chips (if any)
    const tagsWrap = document.createElement('div');
    tagsWrap.className = 'd-flex flex-wrap gap-1 mb-2';
    const tags = Array.isArray(listing.tags) ? listing.tags.filter(Boolean) : [];
    tags.slice(0, 5).forEach((tg) => {
      const a = document.createElement('a');
      a.href = `/pages/listings/browse.html?_tag=${encodeURIComponent(tg)}`;
      a.className = 'badge bg-light text-dark border';
      a.setAttribute('aria-label', `Filter by tag ${tg}`);
      a.textContent = `#${tg}`;
      tagsWrap.appendChild(a);
    });

    const desc = document.createElement('p');
    desc.className = 'card-text small text-muted text-secondary text-truncate mb-2';
    desc.textContent = listing.description || 'No description available.';

    const footer = document.createElement('div');
    footer.className = 'd-flex flex-column gap-2 mt-auto';

    const hr = document.createElement('hr');
    hr.className = 'my-2 opacity-50';

    const timeInfo = computeTimeLeft(listing.endsAt);
    const time = document.createElement('span');
    if (timeInfo) {
      time.className = 'badge bg-light text-dark border time-badge';
      time.textContent = `Ends: ${timeInfo.short}`;
      time.title = timeInfo.long;
      time.setAttribute('aria-label', `Ends in ${timeInfo.long}`);
    } else {
      time.className = 'badge bg-secondary text-white time-badge';
      time.textContent = 'Auction ended';
      time.setAttribute('aria-label', 'Auction ended');
    }

    const button = document.createElement('a');
    button.href = `/pages/listings/details.html?id=${listing.id}`;
    button.className = 'btn w-100';
    button.textContent = 'Read More';

    footer.append(time, hr, button);
    body.append(titleLink, tagsWrap, desc, footer);
    card.append(imgWrap, body);
    col.append(card);
    row.append(col);
  });

  container.append(row);
}

/**
 * Truncates a string to a maximum length and adds ellipsis if needed.
 * @param str
 * @param max
 * @returns {string|*}
 */

function truncate(str, max = 60) {
  if (!str) {
    return '';
  }
  return str.length > max ? str.slice(0, str.lastIndexOf(' ', max)) + '...' : str;
}
