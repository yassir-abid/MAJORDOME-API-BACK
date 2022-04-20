const jwt = require('jsonwebtoken');
const debug = require('debug')('authenticate');

const { ApiError } = require('../helpers/errorHandler');

/**
 * Controller to authenticate token
 * ExpressMiddleware signature
 * @param {object} request Express request object
 * @param {object} response Express response object (not used)
 * @param {object} next Express next object
 * @returns {object} next or error
 */
const authenticateToken = (request, _, next) => {
    // eslint-disable-next-line dot-notation
    const bearerHeader = request.headers['authorization'];
    if (!bearerHeader) {
        throw new ApiError('Invalid authentification', { statusCode: 401 });
    }
    debug(bearerHeader);

    const bearerToken = bearerHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(bearerToken, process.env.TOKEN_KEY);
        request.decoded = decoded;

        debug(decoded);

        next();
    } catch (error) {
        throw new ApiError('Invalid authentification', { statusCode: 401 });
    }
};

module.exports = authenticateToken;
