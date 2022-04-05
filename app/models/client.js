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
        /** Solution 1 */
        // const result = await client.query(`
        // SELECT
        //     client.*,
        //     json_agg(json_build_object('id', address.id, 'number', address.number,
        //                              'street', address.street,
        //                             'postal_code', address.postal_code, 'city', address.city,
        //                              'comments', address.comments,
        //                              'client_id', address.client_id)) as addresses
        // FROM client
        // LEFT JOIN address on address.client_id = client.id
        // GROUP BY client.id
        // ORDER BY client.id;
        // `);

        /** Solution 2 */
        const result = await client.query(`
        SELECT * FROM (
            SELECT
                client.*,
                json_agg(json_build_object('id', address.id, 'number', address.number, 'street', address.street,
                                           'postal_code', address.postal_code, 'city', address.city,
                                           'comments', address.comments, 'client_id', address.client_id)) as addresses
            FROM client
            JOIN address on address.client_id = client.id
            GROUP BY client.id
            UNION ALL
            SELECT client.*, json_build_array() as addresses FROM client
            WHERE client.id <> ALL (
                SELECT address.client_id FROM address
            ))
        as client
        ORDER BY client.id
        ;
        `);

        /** Solution 3 */
        // const result = await client.query(`
        // SELECT * FROM (
        //     SELECT
        //         client.*,
        //         jsonb_agg(jsonb_build_object('id', address.id, 'number', address.number,
        //                                      'street', address.street,
        //                                      'postal_code', address.postal_code,
        //                                      'city', address.city,
        //                                      'comments', address.comments,
        //                                      'client_id', address.client_id)) as addresses
        //     FROM client
        //     JOIN address on address.client_id = client.id
        //     GROUP BY client.id
        //     UNION
        //     SELECT client.*, null as addresses FROM client
        //     WHERE client.id <> ALL (
        //         SELECT address.client_id FROM address
        //     ))
        // as client
        // ORDER BY client.id
        // ;
        // `);

        return result.rows;
    },
};

module.exports = clientDataMapper;
