const client = require('../config/db');
const debug = require('debug')('Profile');

const dataMapper = {

    /**
     * Get by id
     * @param {number} profileId - The desired Profile id
     * @returns {(Profile|undefined)} - Desired Profile or undefined if no Profile with that id
     */
    async findByPk(profileId) {
        const preparedquery = {
            text: `SELECT * FROM provider WHERE id = $1`,
            values: [profileId],
        };

        const result = await client.query(preparedquery);

        if (result.rowsCount === 0) {
            return null;
        }

        return result.rows[0];
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

        const savedProfile = await client.query(
            `
                UPDATE provider SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedProfile.rows[0];
    },


    /**
     * Delete from database
     * @param {number} id - Id to delete
     * @returns {boolean} - Deletion result
     */
    async delete(id) {
        const result = await client.query(`DELETE FROM provider WHERE id = $1`, [id]);

        return !!result.rowCount;
    },

     /**
     * Checks if a Profile with the same email already exists
     * @param {object} inputData - Data provided by client
     * @param {number} profileId - Profile id (optional)
     * @returns {(Profile|null)} - Existing Profile
     * or null if no Profile with these data
     */
      async isUnique(inputData, clientId) {
        const preparedQuery = {
            text: 'SELECT * FROM client WHERE email = $1',
            values: [inputData.email],
        };

        if (clientId) {
            preparedQuery.text += ' AND id <> $2;';
            preparedQuery.values.push(clientId);
        }

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

};

module.exports = dataMapper;
