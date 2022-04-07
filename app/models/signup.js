const debug = require('debug')('SignupDataMapper');
const client = require('../config/db');

/**
 * @typedef {object} Profile
 * @property {number} id - Profile id
 * @property {string} firstname - Profile firstname
 * @property {string} lastname - Profile lastname
 * @property {string} email - Profile email
 * @property {string} phone - Profile phone number
 * @property {string} password - Profile password
 */

/**
 * @typedef {object} InputSignup
 * @property {string} firstname - User firstname
 * @property {string} lastname - User last
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * @typedef {object} ProfileAndToken
 * @property {number} id - Profile id
 * @property {string} firstname - Profile firstname
 * @property {string} lastname - Profile lastname
 * @property {string} email - Profile email
 * @property {string} phone - Profile phone number
 * @property {string} token - Token
 */

const dataMapper = {
    /**
     * Find if a profile exists with the same email
     * @param {InputSignup} inputData - Data provided by user
     * @returns {(Profile|null)} - Existing Profile
     * or null if no Profile with these data
     */
    async findByEmail(inputData) {
        debug('FindByEmail');
        const preparedQuery = {
            text: 'SELECT * FROM provider WHERE email = $1;',
            values: [inputData.email],
        };

        const result = await client.query(preparedQuery);

        debug(result);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

};

module.exports = dataMapper;
