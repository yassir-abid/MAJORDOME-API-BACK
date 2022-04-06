const client = require('../config/db');

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
 */
/**
 * @typedef {Object} InputClient
 * @property {string} firstname - Client's firstname
 * @property {string} lastname - Client's lastname
 * @property {string} email - Client's email
 * @property {string} phone - Client's phone
 * @property {string} comments - Client's comments and specific informations
 * @property {string} our_equipments - Client's equipment installed by the provider
 * @property {string} other_equipments - Client's equipment installed by other providers
 * @property {string} needs - Client's needs identified by the provider
 * @property {number} provider_id - Id of the provider linked to the client
 */
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
 * @typedef {object} ClientWithAddress
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
     * @returns {array<ClientWithAddress>} - All clients of the database and their addresses
     */
    async findAll() {
        const result = await client.query('SELECT * FROM client_and_addresses ORDER BY id;');
        return result.rows;
    },

    /**
     * Find client by id
     * @param {number} clientId - id of the desired client
     * @returns {(ClientWithAddress|undefined)} -
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
    /**
     * Add client in the database
     * @param {InputClient} client - Data to insert
     * @returns {Client} - Inserted client
     */
    async insert(clientInfos) {
        const preparedQuery = {
            text: `INSERT INTO client
                    (firstname, lastname, email, phone, comments, our_equipments, other_equipments, needs, provider_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
            values: [clientInfos.firstname, clientInfos.lastname, clientInfos.email,
                clientInfos.phone, clientInfos.comments, clientInfos.our_equipments,
                clientInfos.other_equipments, clientInfos.needs, clientInfos.provider_id],
        };
        const savedClient = await client.query(preparedQuery);

        return savedClient.rows[0];
    },
    /**
     * Update client
     * @param {number} id - id of the client to update
     * @param {InputClient} clientInfos - Data to update
     * @returns {Client} - Updated client
     */
    async update(id, clientInfos) {
        const fields = Object.keys(clientInfos).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(clientInfos);

        const savedClient = await client.query(
            `
                UPDATE client SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedClient.rows[0];
    },
    /**
     * Checks if a client already exists with the same email
     * @param {object} inputData - Data provided
     * @param {number} clientId - Client id (optional)
     * @returns {(Client|null)} - The existing client
     * or null if no client exists with this data
     */
    async isUnique(inputData, clientId) {
        const preparedQuery = {
            text: 'SELECT * FROM client WHERE email = $1',
            values: [inputData.email],
        };

        if (clientId) {
            preparedQuery.text += ' AND id <> $2;';
            preparedQuery.values.push(clientId);
        } else {
            preparedQuery.text += ';';
        }

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};

module.exports = clientDataMapper;
