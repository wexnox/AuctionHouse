export default function createHtmlCards(listings, container) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'gy-4');

    listings.forEach((listing) => {
        const {media, endsAt, id} = listing;

        const cardEl = createCardElement();
        const cardBodyEl = createCardBody(listing);
        const imageEl = createImage(media);
        const endsAtEl = createEndTimeElement(endsAt);
        const bidBtnEl = createBidButton(id);

        cardBodyEl.append(endsAtEl, bidBtnEl);
        cardEl.append(imageEl, cardBodyEl);

        const colDiv = document.createElement('div');
        colDiv.classList.add('col-sm-12', 'col-lg-4', 'my-2', 'd-flex');
        colDiv.append(cardEl);

        rowDiv.append(colDiv);
    });

    container.append(rowDiv);
}

function createCardElement() {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'd-flex', 'flex-column', 'justify-content-center', 'glass');
    // cardEl.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';  // More transparent background
    // cardEl.style.backdropFilter = 'blur(10px)';  // Increase the Blur Filter
    // cardEl.style.border = '1px solid rgba(255, 255, 255, 0.2)';  // Border for the glass effect

    return cardEl;
}

function createCardBody(listing) {
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('card-body');

    const titleEl = createTitle(listing.title);
    const descEl = createDescription(listing.description);
    bodyEl.append(titleEl, descEl);

    if (Array.isArray(listing.features)) {
        listing.features.forEach((feature) => {
            const featureEl = document.createElement('p');
            featureEl.classList.add('text-gray-600');
            featureEl.textContent = feature;
            bodyEl.append(featureEl);
        });
    }

    return bodyEl;
}

function createTitle(title, maxLength = 50) {
    const titleEl = document.createElement('h5');
    titleEl.classList.add('card-title', 'text-lg', 'sm:text-xl', 'font-semibold', 'text-gray-900');
    titleEl.textContent = truncateString(title, maxLength);
    return titleEl;
}

function truncateString(str, maxLength) {
    var trimmedString = str.substr(0, maxLength);
    return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + "...";
}

function createDescription(description) {
    const descEl = document.createElement('p');
    descEl.classList.add('card-text', 'py-2', 'text-gray-700');
    if (description) {
        descEl.textContent = description;
    }
    return descEl;
}

function createImage(media) {
    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', media.length >= 1 ? media[0] : '../../../img/no-image.jpeg');
    imageEl.classList.add('card-img-top', 'mt-3');
    imageEl.style.margin = "auto";
    imageEl.style.height = '250px';
    imageEl.style.objectFit = 'cover';
    return imageEl;
}

function createEndTimeElement(endsAt) {
    const endsAtEl = document.createElement('p');
    endsAtEl.classList.add('card-text');

    const date = new Date(endsAt);
    const today = new Date();
    endsAtEl.textContent = date <= today ? `Auction ended` : `Ends in: ${date.getDay()} day(s) ${date.getHours()} hour(s) ${date.getMinutes()} minutes`;

    return endsAtEl;
}

// TODO: add glass class
function createBidButton(id) {
    const bidBtnEl = document.createElement('a');
    bidBtnEl.setAttribute('href', `listings/details.html?id=${id}`);
    bidBtnEl.classList.add('btn', 'text-blue-600', 'hover:underline', 'flex', 'items-center', 'mb-4', 'sm:mb-0');
    bidBtnEl.textContent = 'Read More';
    bidBtnEl.style.backgroundColor = 'rgba(0, 123, 255, 0.6)';
    bidBtnEl.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    bidBtnEl.style.backdropFilter = 'blur(10px)';
    bidBtnEl.style.borderRadius = '10px';
    // bidBtnEl.style.backgroundColor = 'transparent';
    bidBtnEl.style.border = 'none';
    return bidBtnEl;
}