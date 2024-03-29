const debug = require('debug')('ClientDataMapper');

const client = require('../config/db');

/**
 * @typedef {object} Client
 * @property {number} id - Client id
 * @property {string} firstname - Client firstname
 * @property {string} lastname - Client lastname
 * @property {string} email - Client email
 * @property {string} phone - Client phone
 * @property {string} comments - Client comments and specific informations
 * @property {string} our_equipments - Client equipment installed by the provider
 * @property {string} other_equipments - Client equipment installed by other providers
 * @property {string} needs - Client needs identified by the provider
 * @property {number} provider_id - Id of the provider linked to the client
 */

/**
 * @typedef {object} Address
 * @property {number} id - Address id
 * @property {string} number - Number of the street
 * @property {string} street - Street
 * @property {string} postal_code - Postal_code
 * @property {string} city - City
 * @property {string} comments - Additionnal informations
 * @property {number} client_id - Id of the client linked to the address
 */

/**
 * @typedef {object} ProjectWithIntervention
 * @property {number} id - Project id
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} comments - Project comments
 * @property {number} client_id - Id of the client linked to the project
 * @property {array<Intervention>} interventions - client interventions
 */

/**
 * @typedef {object} ClientWithAddress
 * @property {number} id - Client id
 * @property {string} firstname - Client firstname
 * @property {string} lastname - Client lastname
 * @property {string} email - Client email
 * @property {string} phone - Client phone
 * @property {string} comments - Client comments and specific informations
 * @property {string} our_equipments - Client equipment installed by the provider
 * @property {string} other_equipments - Client equipment installed by other providers
 * @property {string} needs - Client needs identified by the provider
 * @property {number} provider_id - Id of the provider linked to the client
 * @property {array<Address>} addresses - client addresses
 */

/**
 * @typedef {object} ClientAddressesProject
 * @property {number} id - Client id
 * @property {string} firstname - Client firstname
 * @property {string} lastname - Client lastname
 * @property {string} email - Client email
 * @property {string} phone - Client phone
 * @property {string} comments - Client comments and specific informations
 * @property {string} our_equipments - Client equipment installed by the provider
 * @property {string} other_equipments - Client equipment installed by other providers
 * @property {string} needs - Client needs identified by the provider
 * @property {number} provider_id - Id of the provider linked to the client
 * @property {array<Address>} addresses - client addresses
 * @property {array<ProjectWithIntervention>} projects - client projects
 */

/**
 * @typedef {object} InputClient
 * @property {string} firstname - Client firstname
 * @property {string} lastname - Client lastname
 * @property {string} email - Client email
 * @property {string} phone - Client phone
 * @property {string} comments - Client comments and specific informations
 * @property {string} our_equipments - Client equipment installed by the provider
 * @property {string} other_equipments - Client equipment installed by other providers
 * @property {string} needs - Client needs identified by the provider
 */

/**
 * @typedef {object} InsertInputAddress
 * @property {string} number - Number of the street
 * @property {string} street - Street
 * @property {string} postal_code - Postal_code
 * @property {string} city - City
 * @property {string} comments - Additionnal informations
 */

/**
 * @typedef {object} UpdateInputAddress
 * @property {number} id - Address id
 * @property {string} number - Number of the street
 * @property {string} street - Street
 * @property {string} postal_code - Postal_code
 * @property {string} city - City
 * @property {string} comments - Additionnal informations
 */

/**
 * @typedef {object} InsertClientWithAddress
 * @property {InputClient} client - Client informations
 * @property {array<InsertInputAddress>} addresses - Client's addresses informations
 */

/**
 * @typedef {object} UpdateClientWithAddress
 * @property {InputClient} client - Client informations
 * @property {array<UpdateInputAddress>} addresses - Client's addresses informations with their
 */

const dataMapper = {
    /**
     * @param {number} providerId - provider id
     * @returns {array<ClientAddressesProject>} - All clients of the database and their addresses
     */
    async findAll(providerId) {
        debug('findAll');
        const preparedQuery = {
            text: 'SELECT * FROM client_addresses_projects WHERE provider_id = $1 ORDER BY lastname, firstname;',
            values: [providerId],
        };
        const result = await client.query(preparedQuery);
        return result.rows;
    },

    /**
     * Find client by id
     * @param {number} clientId - id of the desired client
     * @param {number} providerId - provider id
     * @returns {(ClientAddressesProject|undefined)} -
     * The desired client or undefined if no client found with this id
     */
    async findByPk(clientId, providerId) {
        debug('findByPk');
        const preparedQuery = {
            text: 'SELECT * FROM client_addresses_projects WHERE id = $1 AND provider_id = $2;',
            values: [clientId, providerId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Add client in the database
     * @param {InputClient} clientInfos - Data to insert
     * @returns {Client} - Inserted client
     */
    async insert(clientInfos) {
        debug('insert');
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
        debug('update');
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
     * Remove client from the database
     * @param {number} id - id of the client to delete
     * @returns {boolean} - Result of the delete operation
     */
    async delete(clientId) {
        debug('delete');
        const preparedQuery = {
            text: 'DELETE FROM client WHERE id = $1',
            values: [clientId],
        };
        const result = await client.query(preparedQuery);
        return !!result.rowCount;
    },

    /**
     * Checks if a client already exists with the same email
     * @param {object} inputData - Data provided
     * @param {number} clientId - Client id (optional)
     * @returns {(Client|null)} - The existing client
     * or null if no client exists with this data
     */
    async isUnique(inputData, clientId) {
        debug('isUnique');
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
