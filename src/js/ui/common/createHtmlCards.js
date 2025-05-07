export default function createHtmlCards(listings, container) {
  const row = document.createElement('div');
  row.className = 'row gy-4';

  listings.forEach((listing) => {
    const col = document.createElement('div');
    col.className = 'col-sm-12 col-lg-4 d-flex';

    const card = document.createElement('div');
    card.className = 'card auction-card shadow-lg w-100 d-flex flex-column';

    const imgLink = document.createElement('a');
    imgLink.href = `/pages/listings/details.html?id=${listing.id}`;

    const img = document.createElement('img');
    img.className = 'card-img-top rounded-top';
    img.src = listing.media?.[0] || '../../src/images/no-image.jpeg';
    img.alt = listing.title;
    img.style.height = '220px';
    img.style.objectFit = 'cover';

    imgLink.appendChild(img);

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


    const desc = document.createElement('p');
    desc.className = 'card-text small text-muted text-secondary text-truncate mb-2';
    desc.textContent = listing.description || 'No description available.';

    const footer = document.createElement('div');
    footer.className = 'd-flex flex-column gap-2 mt-auto';

    const hr = document.createElement('hr');
    hr.className = 'my-2 opacity-50';

    const time = document.createElement('span');
    time.className = 'badge text-dark';
    time.textContent = getTimeLeft(new Date(listing.endsAt)) || 'Auction ended';

    const button = document.createElement('a');
    button.href = `/pages/listings/details.html?id=${listing.id}`;
    button.className = 'btn w-100';
    button.textContent = 'Read More';

    footer.append(time, hr, button);
    body.append(titleLink, desc, footer);
    card.append(imgLink, body);
    col.append(card);
    row.append(col);
  });

  container.append(row);
}

function truncate(str, max = 60) {
  if (!str) {
    return '';
  }
  return str.length > max ? str.slice(0, str.lastIndexOf(' ', max)) + '...' : str;
}

function getTimeLeft(end) {
  const now = new Date();
  const diff = end - now;
  if (diff <= 0) {
    return null;
  }
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  return `Ends in: ${days} day(s) ${hours} hour(s) ${mins} minutes`;
}