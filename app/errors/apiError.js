/**
 * Define our own error to allow it to take additional information: an HTTP status code
 * @typedef {object} ApiError
 * @property {string} status - Status
 * @property {number} statusCode - HTTP Status code
 * @property {string} message - Error message
 */
module.exports = class ApiError extends Error {
    constructor(message, infos) {
        super(message);
        this.infos = infos;
    }
};
