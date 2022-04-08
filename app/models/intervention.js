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
     * @returns {array<Intervention>} - All interventions of the day in database
     */
    async findAllOfDay() {
        debug('findAllOfDay');
        const result = await client.query('SELECT * FROM intervention WHERE date::date = current_date;');
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

    /**
     * Add intervention in the database
     * @param {InputIntervention} intervention - Data to insert
     * @returns {Intervention} - Inserted intervention
     */
    async insert(intervention) {
        debug('insert');
        const preparedQuery = {
            text: ` INSERT INTO intervention
            (title, description, date, status, comments, report, project_id) VALUES
            ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
            values: [intervention.title, intervention.description,
                intervention.date, intervention.status,
                intervention.comments, intervention.report,
                intervention.project_id],
        };
        const savedIntervention = await client.query(preparedQuery);

        return savedIntervention.rows[0];
    },

    /**
     * Update intervention
     * @param {number} id - id of the intervention to update
     * @param {InputIntervention} intervention - Data to edit
     * @returns {Intervention} - Updated intervention
     */
    async update(id, intervention) {
        debug('update');
        const fields = Object.keys(intervention).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(intervention);

        const savedIntervention = await client.query(
            `
                UPDATE intervention SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *;
            `,
            [...values, id],
        );
        debug(savedIntervention);

        return savedIntervention.rows[0];
    },

    /**
     * Remove intervention from the database
     * @param {number} id - id of the intervention to delete
     * @returns {boolean} - Result of the delete operation
     */
    async delete(id) {
        debug('delete');
        const preparedQuery = {
            text: 'DELETE FROM intervention WHERE id = $1',
            values: [id],
        };
        const result = await client.query(preparedQuery);
        return !!result.rowCount;
    },
};

module.exports = interventionDataMapper;
