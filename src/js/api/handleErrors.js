export default function handleErrors(responseData) {
  // If responseData is null or undefined, throw an error
  if (!responseData) {
    throw new Error('There was an error processing the request.');
  }

  // If there are errors and they are in an array, throw with detailed messages
  if (responseData.errors && Array.isArray(responseData.errors)) {
    const errorMessage = responseData.errors
      .map((error) => error.message)
      .join('\n');
    throw new Error(errorMessage);
  }
}

function createHttpErrorMessage(response) {
  return `HTTP error! status: ${response.status}`;
}

export function handleHttpError(response) {
  if (!response.ok) {
    const error = new Error(createHttpErrorMessage(response));
    console.error(error);
    throw error;
  }
}