const debug = require('debug')('Profile');
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
 * @typedef {object} InputProfile
 * @property {string} firstname - Profile firstname
 * @property {string} lastname - Profile lastname
 * @property {string} email - Profile email
 * @property {string} phone - Profile phone number
 * @property {string} password - Profile password
 */

const dataMapper = {

    /**
     * Find profile by id
     * @param {number} profileId - The desired Profile id
     * @returns {(Profile|undefined)} -
     * Desired Profile or undefined if no Profile with that id
     */
    async findByPk(profileId) {
        const preparedQuery = {
            text: 'SELECT firstname, lastname, email, phone, address FROM provider WHERE id = $1',
            values: [profileId],
        };

        const result = await client.query(preparedQuery);

        debug(result);

        if (result.rowsCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Add profile in the database
     * @param {InputProfile} client - Data to insert
     * @returns {Profile} - Inserted profile
     */
    async insert(profile) {
        const preparedQuery = {
            text: `INSERT INTO provider
                    (firstname, lastname, email, phone, address, password)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id, firstname, lastname, email, phone, address;`,
            values: [profile.firstname, profile.lastname, profile.email,
                profile.phone, profile.address, profile.password],
        };
        const savedProfile = await client.query(preparedQuery);

        debug(savedProfile);

        return savedProfile.rows[0];
    },

    /**
     * Edit in database
     * @param {number} id - Id of the entity to edit
     * @param {InputProfile} profile - Data to edit
     * @returns {Profile} - Edited Profile
     */
    async update(id, profile) {
        const fields = Object.keys(profile).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(profile);

        debug(fields);

        debug(values);

        const savedProfile = await client.query(
            `
                UPDATE provider SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );
        debug(savedProfile);

        return savedProfile.rows[0];
    },

    /**
     * Remove profile from database
     * @param {number} id - Id to delete
     * @returns {boolean} - Deletion result
     */
    async delete(id) {
        const preparedQuery = {
            text: 'DELETE FROM provider WHERE id = $1',
            values: [id],
        };
        const result = await client.query(preparedQuery);

        debug(result);

        return !!result.rowCount;
    },

    /**
     * Checks if a Profile with the same email already exists
     * @param {object} inputData - Data provided by client
     * @param {number} profileId - Profile id (optional)
     * @returns {(Profile|null)} - Existing Profile
     * or null if no Profile with these data
     */
    async isUnique(inputData, profileId) {
        const preparedQuery = {
            text: 'SELECT * FROM provider WHERE email = $1',
            values: [inputData.email],
        };

        if (profileId) {
            preparedQuery.text += ' AND id <> $2;';
            preparedQuery.values.push(profileId);
        }

        const result = await client.query(preparedQuery);

        debug(result);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

};

module.exports = dataMapper;
