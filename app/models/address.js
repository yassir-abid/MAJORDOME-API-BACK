const debug = require('debug')('AddressDataMapper');
const client = require('../config/db');

/**
 * @typedef {object} Address
 * @property {number} id - Address's table PK
 * @property {string} number - Number of the street
 * @property {string} street - Street
 * @property {string} postal_code - Postal_code
 * @property {string} city - City
 * @property {string} comments - Additionnal informations
 * @property {number} client_id - Id of the client linked to the address
 */

/**
 * @typedef {object} InputAddress
 * @property {string} number - Number of the street
 * @property {string} street - Street
 * @property {string} postal_code - Postal_code
 * @property {string} city - City
 * @property {string} comments - Additionnal informations
 * @property {number} client_id - Id of the client linked to the address
 */

const addressDataMapper = {
    /**
     * Find address by id
     * @param {number} addressId - id of the desired client
     * @returns {(Address|undefined)} -
     * The desired address or undefined if no address found with this id
     */
    async findByPk(addressId) {
        debug('findByPk');
        const preparedQuery = {
            text: 'SELECT * FROM address WHERE id = $1;',
            values: [addressId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Add address in the database
     * @param {InputAddress} address - Data to insert
     * @returns {Address} - Inserted address
     */
    async insert(address) {
        debug('insert');
        const preparedQuery = {
            text: `INSERT INTO address
                    (number, street, postal_code, city, comments, client_id)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
            values: [address.number, address.street, address.postal_code,
                address.city, address.comments, address.client_id],
        };
        const savedAddress = await client.query(preparedQuery);

        return savedAddress.rows[0];
    },

    /**
     * Update address
     * @param {number} id - id of the address to update
     * @param {InputAddress} address - Data to update
     * @returns {Address} - Updated Address
     */
    async update(id, address) {
        debug('update');
        const fields = Object.keys(address).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(address);

        const savedAddress = await client.query(
            `
                UPDATE address SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedAddress.rows[0];
    },

    /**
     * Remove address from the database
     * @param {number} id - id of the address to delete
     * @returns {boolean} - Result of the delete operation
     */
    async delete(id) {
        debug('delete');
        const preparedQuery = {
            text: 'DELETE FROM address WHERE id = $1',
            values: [id],
        };
        const result = await client.query(preparedQuery);
        return !!result.rowCount;
    },
};

module.exports = addressDataMapper;
