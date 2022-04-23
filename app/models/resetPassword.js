const debug = require('debug')('ResetPassword');
const client = require('../config/db');

/**
 * @typedef {object} ProfileWithPassword
 * @property {number} id - Profile id
 * @property {string} firstname - Profile firstname
 * @property {string} lastname - Profile lastname
 * @property {string} email - Profile email
 * @property {string} phone - Profile phone number
 * @property {string} password - Profile password
 */

/**
 * @typedef {object} Profile
 * @property {number} id - Profile id
 * @property {string} firstname - Profile firstname
 * @property {string} lastname - Profile lastname
 * @property {string} email - Profile email
 * @property {string} phone - Profile phone number
 * @property {string} address - Profile address
 * @property {string} picture - Profile picture
 */

/**
 * @typedef {object} InputResetPassword
 * @property {string} email - User email
 */

/**
 * @typedef {object} InputChangePassword
 * @property {number} id - User id
 * @property {string} password - User new password
 * @property {string} passwordConfirm - User new password confirmation
 */

/**
 * @typedef {object} Token
 * @property {number} id - Token id
 * @property {string} token - Token
 * @property {string} issued_at - Creation date of the token
 * @property {string} expires - Validity of the token
 */

const dataMapper = {
    /**
     * Find if a profile exists with the same email
     * @param {InputAskNewPassword} inputData - Data provided by user
     * @returns {(ProfileWithPassword|null)} - Existing Profile
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

    /**
     * Edit password in database
     * @param {number} id - profile id
     * @param {InputChangePassword} passwordInfos - Password and its confirmation
     * @returns {Profile} - Edited Profile
     */
    async updatePassword(id, password) {
        debug('update');

        const savedPassword = await client.query(
            `
                    UPDATE provider
                    SET password =$2
                    WHERE id = $1
                    RETURNING id, firstname, lastname, email, phone, address, picture
                `,
            [id, password],
        );
        debug(savedPassword);

        return savedPassword.rows[0];
    },

    /**
     * Find if a token exists for the user
     * @returns {(Token|null)} - Existing Profile
     * or null if no Profile with these data
     */
    async findToken(providerId) {
        const preparedQuery = {
            text: 'SELECT * FROM token WHERE provider_id = $1',
            values: [providerId],
        };
        const result = await client.query(preparedQuery);

        debug(result);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    async createToken(token, expiringDate, providerId) {
        const preparedQuery = {
            text: `INSERT INTO token
            (token, expiring_date, provider_id)
            VALUES ($1, $2, $3) RETURNING *`,
            values: [token, expiringDate, providerId],
        };
        const savedToken = await client.query(preparedQuery);

        debug(savedToken);

        return savedToken.rows[0];
    },

    /**
     * Remove token from the database
     * @param {number} id - id of the token to delete
     * @returns {boolean} - Result of the delete operation
     */
    async deleteToken(id) {
        const preparedQuery = {
            text: 'DELETE FROM token WHERE id = $1',
            values: [id],
        };

        const result = await client.query(preparedQuery);

        debug(result);

        return !!result.rowCount;
    },
};

module.exports = dataMapper;
