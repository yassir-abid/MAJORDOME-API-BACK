const logger = require('./logger');
const ApiError = require('../errors/apiError');
const WebsiteError = require('../errors/websiteError');

/**
 * Middleware that respond to a next method with an error as argument
 * @param {object} error Error class
 * @param {object} response Express response object
 */
const errorHandler = (error, response) => {
    let { message } = error;
    let statusCode = error.infos?.statusCode;

    if (!statusCode || Number.isNaN(Number(statusCode))) {
        statusCode = 500;
    }

    if (statusCode === 500) {
        logger.error(error);
    }

    if (statusCode === 500 && response.app.get('env') !== 'development') {
        message = 'Internal Server Error';
    }

    if (response.get('Content-type').includes('html')) {
        response.status(statusCode).render('error', {
            statusCode,
            message,
            title: `Error ${error.statusCode}`,
        });
    } else {
        response.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
        });
    }
};

module.exports = {
    ApiError,
    WebsiteError,
    errorHandler,
};
