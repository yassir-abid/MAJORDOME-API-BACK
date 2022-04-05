const client = require('../config/db');
const debug = require('debug')('Profile');

const dataMapper = {
    async findByPk(profileId) {
        const preparedquery = {
            text: `SELECT * FROM provider WHERE id = $1`,
            values: [profileId],
        };
        debug(preparedquery);

        const result = await client.query(preparedquery);

        if (result.rowsCount === 0) {
            return null;
        }

        return result.rows[0];
    },

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

    async delete(id) {
        const result = await client.query(`DELETE FROM provider WHERE id = $1`, [id]);

        return !!result.rowCount;
    },

    async isUnique(inputData, profileId) {
        const fields = [];
        const values = [];
        Object.entries(inputData).forEach(([key, value], index) => {
            if(['email'].includes(key)) {
                fields.push(`"${key} = $${index + 1}`);
                values.push(value);
            }
        });
    }
};


module.exports = dataMapper;
