export default function createHtml(listings, container) {
    // Create a new div element for the row
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'gy-4');

    // Append each card to the row
    listings.forEach((listing) => {
        const {media, endsAt, id} = listing;

        const cardEl = createCardElement();
        const cardBodyEl = createCardBody(listing);
        const imageEl = createImage(media);
        const endsAtEl = createEndTimeElement(endsAt);
        const bidBtnEl = createBidButton(id);

        cardBodyEl.append(endsAtEl, bidBtnEl);
        cardEl.append(imageEl, cardBodyEl);

        // Create a new div for the column and apply classes for different screen sizes
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-sm-12', 'col-lg-4', 'my-2', 'd-flex');
        colDiv.append(cardEl);

        rowDiv.append(colDiv);
    });

    container.append(rowDiv);
}

function createCardElement() {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'd-flex', 'flex-column', 'justify-content-center');
    cardEl.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    cardEl.style.backdropFilter = 'blur(10px)';

    return cardEl;
}

function createCardBody(listing) {
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('card-body');
    const titleEl = createTitle(listing.title);
    const descEl = createDescription(listing.description);
    bodyEl.append(titleEl, descEl);

    // cycle through each feature of the listing
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
    // trim the string to the maximum length
    var trimmedString = str.substr(0, maxLength);

    // re-trim if we are in the middle of a word and append with "..."
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
    imageEl.style.margin = "auto"; // centers the image horizontally
    // set a fixed width and height
    // imageEl.style.width = '250px';
    imageEl.style.height = '250px';
    // Making sure image cover the whole space, cropping if necessary
    imageEl.style.objectFit = 'cover';
    // imageEl.style.boxShadow = '5px 5px 15px #888888';

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

function createBidButton(id) {
    const bidBtnEl = document.createElement('a');
    bidBtnEl.setAttribute('href', `listings/details.html?id=${id}`);
    bidBtnEl.classList.add('btn', 'text-blue-600', 'hover:underline', 'flex', 'items-center', 'mb-4', 'sm:mb-0');
    bidBtnEl.textContent = 'See more';


    bidBtnEl.style.backgroundColor = 'rgba(0, 123, 255, 0.6)';
    bidBtnEl.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    bidBtnEl.style.backdropFilter = 'blur(10px)';
    bidBtnEl.style.borderRadius = '10px';

    bidBtnEl.style.backgroundColor = 'transparent';
    bidBtnEl.style.border = 'none';

    return bidBtnEl;
}