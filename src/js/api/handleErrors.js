/**
 * Handles errors from API responses.
 * @param responseData
 */

export default function handleErrors(responseData) {
  if (!responseData && Array.isArray(responseData.errors) && responseData.errors.length) {
    const errorMessage = responseData.errors.map((error) => error.message).join('\n');

    throw new Error(errorMessage);
  }
  if (responseData && typeof responseData === 'object' && responseData.message) {
    throw new Error(responseData.message);
  }

  throw new Error('There was an error processing the request.');
}

/**
 * Creates an error message for HTTP errors.
 * @param response
 * @returns {string}
 */

function createHttpErrorMessage(response) {
  return `HTTP error! status: ${response.status}`;
}

/**
 * Handles HTTP errors.
 * @param response
 */

export function handleHttpError(response) {
  if (!response.ok) {
    const error = new Error(createHttpErrorMessage(response));
    console.error(error);
    throw error;
  }
}
