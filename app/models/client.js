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
 * @typedef {object} Client
 * @property {number} id - Client's table PK
 * @property {string} firstname - Client's firstname
 * @property {string} lastname - Client's lastname
 * @property {string} email - Client's email
 * @property {string} phone - Client's phone
 * @property {string} comments - Client's comments and specific informations
 * @property {string} our_equipments - Client's equipment installed by the provider
 * @property {string} other_equipments - Client's equipment installed by other providers
 * @property {string} needs - Client's needs identified by the provider
 * @property {number} provider_id - Id of the provider linked to the client
 * @property {array<Address>} addresses - client's addresses
 */

const clientDataMapper = {
    /**
     * @returns {array<Client>} - All clients of the database and their addresses
     */
    async findAll() {
        const result = await client.query('SELECT * FROM client_and_addresses ORDER BY id;');
        return result.rows;
    },

    /**
     * Find client by id
     * @param {number} clientId - id of the desired client
     * @returns {(Client|undefined)} -
     * The desired client or undefined if no client found with this id
     */
    async findByPk(clientId) {
        const preparedQuery = {
            text: 'SELECT * FROM client_and_addresses WHERE id = $1;',
            values: [clientId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },
};

module.exports = clientDataMapper;
