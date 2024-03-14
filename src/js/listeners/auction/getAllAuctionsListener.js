import {displayMessage} from '../../ui/common/displayMessage.js';
import {toggleAuctionLoadMore} from '../../ui/helpers/toggleAuctionLoadMore.js';
import * as api from '../../api/listings/getAllListings.js';
import {AUCTIONS_LIMIT} from '../../api/constants.js';
import createHtmlCards from '../../ui/common/createHtmlCards.js';
import {toggleLoadingIndicator} from '../../ui/helpers/toggleLoadingIndicator.js';

const ERROR_COLOR = 'danger';

export function getAllAuctionsListener() {
    const container = document.querySelector('#listingsContainer');
    let offset = 0;

    async function fetchAndDisplayAuctions() {
        const auctions = await api.getAllListings(offset);
        offset += AUCTIONS_LIMIT;
        createHtmlCards(auctions, container);
        const hideBtn = (auctions.length === 0 || auctions.length < AUCTIONS_LIMIT);
        toggleAuctionLoadMore(hideBtn);
        return auctions;
    }

    return async function listAuctions() {
        try {
            toggleLoadingIndicator(container);
            toggleAuctionLoadMore(true);
            await fetchAndDisplayAuctions();
        } catch (error) {
            displayMessage(ERROR_COLOR, error.message);
        } finally {
            toggleLoadingIndicator(container);
        }
    };
}