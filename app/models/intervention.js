const debug = require('debug')('InterventionDataMapper');
const client = require('../config/db');

/**
 * @typedef {object} Intervention
 * @property {number} id - Intervention id
 * @property {string} title - Intervention title
 * @property {string} description - Intervention description
 * @property {string} date - Intervention date (timestamptz)
 * @property {string} status - Intervention status
 * @property {string} comments - Intervention comments and specific informations
 * @property {string} report - Post-Intervention report
 * @property {number} project_id - Id of the project linked to the intervention
 */

/**
 * @typedef {object} InputIntervention
 * @property {string} title - Intervention title
 * @property {string} description - Intervention description
 * @property {string} date - Intervention date (timestamptz)
 * @property {string} status - Intervention status
 * @property {string} comments - Intervention comments and specific informations
 * @property {string} report - Post-Intervention report
 * @property {number} project_id - Id of the project linked to the intervention
 */

const interventionDataMapper = {
    /**
     * @returns {array<Intervention>} - All interventions of the database
     */
    async findAll() {
        debug('findAll');
        const result = await client.query('SELECT * FROM intervention;');
        return result.rows;
    },

    /**
     * Find intervention by id
     * @param {number} interventionId - id of the desired intervention
     * @returns {(Intervention|undefined)} -
     * The desired intervention or undefined if no intervention found with this id
     */
    async findByPk(interventionId) {
        debug('findByPk');
        const preparedQuery = {
            text: 'SELECT * FROM intervention WHERE id = $1;',
            values: [interventionId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },
};

module.exports = interventionDataMapper;
