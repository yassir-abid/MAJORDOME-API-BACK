const debug = require('debug')('LoginDataMapper');
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
 * @typedef {object} InputLogin
 * @property {string} email - Profile email
 * @property {string} password - Profile password
 */

/**
 * @typedef {object} Token
 * @property {boolean} logged - Login status
 * @property {string} pseudo - Profile name
 * @property {string} token - Profile token
 */

const dataMapper = {
    /**
     * Find a Profile by email
     * @param {InputLogin} inputData - Data provided by client
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
