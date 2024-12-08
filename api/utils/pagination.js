/**
 * Utility function to handle pagination and validate page range
 * @param {number} total - Total number of documents in the collection
 * @param {number} currentTotal - Number of posts returned on the current page
 * @param {number} page - The current page number requested by the user
 * @param {number} limit - The number of items per page
 * @param {string} baseUrl - The base URL for pagination links
 * @returns {Object} Pagination metadata including total items, total pages, prev and next page URLs, or error if page is invalid
 */
export const paginate = (total, currentTotal, page, limit, baseUrl) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalPages = Math.ceil(total / limit);

    // Validate if the requested page is within the valid range
    if (page > totalPages && totalPages > 0) {
        return {
            error: true,
            status: 400,
            message: "Requested page exceeds the total number of pages",
            totalPages,
        };
    }

    // Generate pagination links
    const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;
    const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;

    return {
        total,
        currentTotal,
        totalPages,
        prevPage,
        nextPage,
    };
};
