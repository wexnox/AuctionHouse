// TODO: Refactor me
export default function handleErrors(responseData) {
    if (
        responseData &&
        responseData.errors & Array.isArray(responseData.errors)
    ) {
        const errorMessage = responseData.errors
            .map((error) => error.message)
            .join('\n');
        throw new Error(errorMessage);
    }
    throw new Error('There was an error processing the request.');
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