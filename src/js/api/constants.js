/** A constant that holds the URL endpoint for accessing the API. */
export const API_HOST_URL = 'https://api.noroff.dev/api/v1';

/** A constant that holds the URL endpoint for accessing the API auction. */
export const API_AUCTION = '/auction';

/** A constant that holds the URL endpoint for accessing the API main. */
export const API_MAIN_URL = `${API_HOST_URL}${API_AUCTION}`;

/** A constant that holds the URL endpoint for accessing the API profile. */
export const API_PROFILE_URL = `${API_MAIN_URL}/profiles`;

/** A constant that holds the URL endpoint for accessing the API listings. */
export const API_LISTINGS_URL = '/listings';

/** A constant that holds the limit for the number of auctions to be displayed on the home page. */
export const AUCTIONS_LIMIT = 15;
