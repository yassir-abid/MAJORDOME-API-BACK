const debug = require('debug')('InterventionDataMapper');
const client = require('../config/db');

/**
 * @typedef {object} Intervention
 * @property {number} id - Intervention id
 * @property {string} title - Intervention title
 * @property {string} description - Intervention description
 * @property {string} date - Intervention date (timestamptz)
 * @property {string} duration - Intervention duration (interval)
 * @property {string} status - Intervention status
 * @property {string} comments - Intervention comments and specific informations
 * @property {string} report - Post-Intervention report
 * @property {number} project_id - Id of the project linked to the intervention
 * @property {number} address_id - Id of the client address linked to the intervention
 */

/**
 * @typedef {object} Project
 * @property {string} id - Project id
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} status - Project status
 * @property {string} comments - Project comments and specific informations
 * @property {number} client_id - Id of the address linked to the Project
 */

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
 * @typedef {object} InterventionWithProjectAndClient
 * @property {number} id - Intervention id
 * @property {string} title - Intervention title
 * @property {string} description - Intervention description
 * @property {string} date - Intervention date (timestamptz)
 * @property {string} duration - Intervention duration (interval)
 * @property {string} end_date - Intervention end date (timestamptz)
 * @property {string} status - Intervention status
 * @property {string} comments - Intervention comments and specific informations
 * @property {string} report - Post-Intervention report
 * @property {Project} project - project linked to the intervention
 * @property {Client} client - client linked to the intervention
 * @property {Address} address - address linked to the intervention
 */

/**
 * @typedef {object} InputIntervention
 * @property {string} title - Intervention title
 * @property {string} description - Intervention description
 * @property {string} date - Intervention start date (timestamptz)
 * @property {string} end_date - Intervention end date (timestamptz)
 * @property {string} status - Intervention status
 * @property {string} comments - Intervention comments and specific informations
 * @property {string} report - Post-Intervention report
 * @property {number} project_id - Id of the project linked to the intervention
 * @property {number} address_id - Id of the address linked to the intervention
 */

/**
 * @typedef {object} Picture
 * @property {number} id - Picture id
 * @property {string} title - Picture title
 * @property {string} status - Picture title (before/after intervention)
 * @property {string} path - Picture path
 * @property {number} intervention_id - Id of the intervention linked to the picture
 */

/**
 * @typedef {object} ReportProject
 * @property {number} id - Report project id
 * @property {string} title - Report project title
 */

/**
 * @typedef {object} ReportClient
 * @property {number} id - Report client id
 * @property {string} firstname - Report client firstname
 * @property {string} lastname - Report client lastname
 */

/**
 * @typedef {object} Report
 * @property {number} id - Intervention id
 * @property {string} title - Intervention title
 * @property {string} description - Intervention description
 * @property {string} date - Intervention date (timestamptz)
 * @property {string} report - Post-Intervention report
 * @property {ReportProject} project - Post-Intervention report
 * @property {ReportClient} client - Post-Intervention report
 * @property {array<Picture>} pictures - project linked to the intervention
 */

const interventionDataMapper = {
    /**
     * @returns {array<Intervention>} - All interventions of the database
     */
    async findAll(providerId) {
        debug('findAll');
        const preparedQuery = {
            text: `SELECT intervention.* FROM intervention
            JOIN project ON project.id = intervention.project_id
            JOIN client ON client.id = project.client_id
            WHERE client.provider_id = $1;`,
            values: [providerId],
        };
        const result = await client.query(preparedQuery);
        return result.rows;
    },
    /**
     * @returns {array<InterventionWithProjectAndClient>} - All interventions of the database
     */
    async findAllWithDetails(providerId) {
        debug('findAllWithDetails');
        const preparedQuery = {
            text: `SELECT intervention_project_client_address.* FROM intervention_project_client_address
            JOIN project ON project.id = intervention_project_client_address.project_id
            JOIN client ON client.id = project.client_id
            WHERE client.provider_id = $1;`,
            values: [providerId],
        };
        const result = await client.query(preparedQuery);
        return result.rows;
    },

    /**
     * @returns {array<Intervention>} - All interventions of the day in database
     */
    async findAllOfDay(providerId) {
        debug('findAllOfDay');
        const preparedQuery = {
            text: `SELECT intervention.* FROM intervention
            JOIN project ON project.id = intervention.project_id
            JOIN client ON client.id = project.client_id
            WHERE intervention.date::date = current_date AND client.provider_id = $1;`,
            values: [providerId],
        };
        const result = await client.query(preparedQuery);
        return result.rows;
    },

    /**
     * Find intervention by id without project, client and address details
     * @param {number} interventionId - id of the desired intervention
     * @returns {(Intervention|undefined)} -
     * The desired intervention or undefined if no intervention found with this id
     */
    async findByPk(interventionId, providerId) {
        debug('findByPk');
        const preparedQuery = {
            text: `SELECT intervention.* FROM intervention
            JOIN project ON project.id = intervention.project_id
            JOIN client ON client.id = project.client_id
            WHERE intervention.id = $1 AND client.provider_id = $2;`,
            values: [interventionId, providerId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Find intervention by id, its project, its client and its address
     * @param {number} interventionId - id of the desired intervention
     * @returns {(InterventionWithProjectAndClient|undefined)} -
     * The desired intervention or undefined if no intervention found with this id
     */
    async findByPkWithDetails(interventionId, providerId) {
        debug('findByPk');
        const preparedQuery = {
            text: `
            SELECT intervention_project_client_address.* FROM intervention_project_client_address
            JOIN project ON project.id = intervention_project_client_address.project_id
            JOIN client ON client.id = project.client_id
            WHERE intervention_project_client_address.id = $1 AND client.provider_id = $2;
            `,
            values: [interventionId, providerId],
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
            (title, description, date, duration, status, comments, report, project_id, address_id) VALUES
            ($1, $2, $3, ($4::timestamptz - $3::timestamptz)::interval, $5, $6, $7, $8, $9) RETURNING *;`,
            values: [intervention.title, intervention.description,
                intervention.date, intervention.end_date, intervention.status,
                intervention.comments, intervention.report,
                intervention.project_id, intervention.address_id],
        };
        const savedIntervention = await client.query(preparedQuery);

        await client.query('SELECT update_project_status($1)', [savedIntervention.rows[0].project_id]);

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

        await client.query('SELECT update_project_status($1)', [savedIntervention.rows[0].project_id]);

        return savedIntervention.rows[0];
    },

    /**
     * Remove intervention from the database
     * @param {number} id - id of the intervention to delete
     * @returns {boolean} - Result of the delete operation
     */
    async delete(interventionId, projectId) {
        debug('delete');
        const preparedQuery = {
            text: 'DELETE FROM intervention WHERE id = $1',
            values: [interventionId],
        };
        const result = await client.query(preparedQuery);
        await client.query('SELECT update_project_status($1)', [projectId]);
        return !!result.rowCount;
    },

    /**
     * Find all addresses linked to the intervention client by project id
     * @param {number} projectId - id of the intervention project
     * @returns {array<id>} - id of the intervention client addresses
     */
    async findClientAddresses(projectId) {
        debug('clientAddresses');
        const preparedQuery = {
            text: `SELECT address.id FROM address
            JOIN client ON client.id = address.client_id
            JOIN project ON client.id = project.client_id
            WHERE project.id = $1;`,
            values: [projectId],
        };
        const result = await client.query(preparedQuery);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows;
    },

    /**
     * Find intervention report by intervention id
     * @param {number} interventionId - id of the desired intervention
     * @returns {(Report|undefined)} -
     * The desired report intervention or undefined if no intervention found with this id
     */
    async findReport(interventionId) {
        debug('findReport');
        const preparedQuery = {
            text: 'SELECT * FROM report_and_pictures WHERE id = $1 ;',
            values: [interventionId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Calculate intervention duration
     * @param {string} startDate - intervention start date
     * @param {string} endDate - intervention end date
     * @returns {(string)} - intervention duration
     */
    async calculateDuration(startDate, endDate) {
        debug('calculateDuration');
        const preparedQuery = {
            text: 'SELECT ($1::timestamptz - $2::timestamptz)::interval',
            values: [endDate, startDate],
        };
        const result = await client.query(preparedQuery);
        return result.rows[0].interval;
    },
};

module.exports = interventionDataMapper;
