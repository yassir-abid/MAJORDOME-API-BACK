const debug = require('debug')('Validator:log');
const { ApiError } = require('../helpers/errorHandler');

/**
 * Middleware generator to validate a property of the request object
 * @param {string} prop - The property of the request object
 * @param {Joi.object} schema - The validation scheme of the Joi module
 * @returns {Function} -
 * Returns an express middleware
 * that validates the request body using the schema passed as a parameter.
 * Returns an error 400 if validation fails.
 */
module.exports = (prop, schema) => async (request, _, next) => {
    try {
        debug(request[prop]);
        await schema.validateAsync(request[prop]);
        next();
    } catch (error) {
        debug(error);
        next(new ApiError(error.details[0].message, { statusCode: 400 }));
    }
};
