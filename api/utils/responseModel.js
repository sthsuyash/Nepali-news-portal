/**
 * Standardizes the API response format.
 * @param {boolean} success - Whether the request was successful.
 * @param {number} statusCode - The HTTP status code to be returned.
 * @param {string} message - A human-readable message explaining the result.
 * @param {object|null} data - The data to return with the response (if any).
 * @param {object|null} error - The error details (if any).
 * @returns {object} - The standardized response object.
 */
export const createResponse = (success, statusCode, message, data = null, error = null) => {
    return {
        success,
        statusCode,
        message,
        data,
        error
    };
};
