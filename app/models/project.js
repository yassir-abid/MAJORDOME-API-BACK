const debug = require('debug')('ProjectDataMapper');

const client = require('../config/db');
/**
 * @typedef {object} Project
 * @property {number} id - Project id
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} comments - Project comments
 * @property {number} client_id - Client id linked to the client
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
 * @typedef {object} ProjectWithClient
 * @property {number} id - Project id
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} comments - Project comments
 * @property {number} client_id - Id of the client linked to the project
 * @property {array<client>} client - client
 */

/**
 * @typedef {object} InputProject
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} comments - Project comments
 * @property {number} client_id - Client id linked to the client
 */

const dataMapper = {

    /**
     * @param {number} providerId - provider id
     * @returns {array<ProjectWithClient>} - All projects of the database with their linked client
     */
    async findAll(providerId) {
        debug('findAll');
        const preparedQuery = {
            text: `SELECT project_with_client.* FROM project_with_client
            JOIN client ON client.id = project_with_client.client_id
            WHERE client.provider_id = $1`,
            values: [providerId],
        };
        const result = await client.query(preparedQuery);

        debug(result);

        return result.rows;
    },

    /**
     * Find project by id with the associated client
     * @param {number} projectId - id of the desired project
     * @param {number} providerId - provider id
     * @returns {(ProjectWithClient|undefined)} -
     * The desired project or undefined if no project found with this id
     */

    async findByPkWithClient(projectId, providerId) {
        debug('findByPkWithClient');

        const preparedQuery = {
            text: `SELECT project_with_client.* FROM project_with_client 
            JOIN client ON client.id = project_with_client.client_id
            WHERE project_with_client.id = $1 AND client.provider_id = $2`,
            values: [projectId, providerId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        debug(result);

        return result.rows[0];
    },

    /**
     * Find project by id
     * @param {number} projectId - id of the desired project
     * @param {number} providerId - provider id
     * @returns {(Project|undefined)} -
     * The desired project or undefined if no project found with this id
     */
    async findByPk(projectId, providerId) {
        debug('findByPk');
        const preparedQuery = {
            text: `SELECT project.* FROM project 
            JOIN client ON client.id = project.client_id
            WHERE project.id = $1 AND client.provider_id = $2;`,
            values: [projectId, providerId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Add project in the database
     * @param {InputProject} projectInfos - Data to insert
     * @returns {Project} - Inserted project
     */
    async insert(projectInfos) {
        debug('insert');
        const preparedQuery = {
            text: `INSERT INTO project
            (title, description, comments, client_id)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            values: [projectInfos.title, projectInfos.description,
                projectInfos.comments, projectInfos.client_id],
        };
        const savedProject = await client.query(preparedQuery);

        debug(savedProject);

        return savedProject.rows[0];
    },

    /**
     * Update project
     * @param {number} id - id of the project to update
     * @param {InputProject} projectInfos - Data to update
     * @returns {Project} - Updated project
     */
    async update(id, projectInfos) {
        debug('update');
        const fields = Object.keys(projectInfos).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(projectInfos);

        debug(fields);
        debug(values);

        const savedProject = await client.query(
            `UPDATE project SET
                ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *`,
            [...values, id],
        );

        debug(savedProject);

        return savedProject.rows[0];
    },

    /**
     * Remove project from the database
     * @param {number} id - id of the project to delete
     * @returns {boolean} - Result of the delete operation
     */
    async delete(id) {
        debug('delete');
        const preparedQuery = {
            text: 'DELETE FROM project WHERE id = $1',
            values: [id],
        };

        const result = await client.query(preparedQuery);

        return !!result.rowCount;
    },

    /**
     * Checks if a project already exists with the same title
     * @param {object} inputData - Data provided
     * @param {number} projectId - Project id (optional)
     * @returns {(Project|null)} - The existing project
     * or null if no project exists with this data
     */
    async isUnique(inputData) {
        debug('isUnique');
        const preparedQuery = {
            text: 'SELECT id, LOWER(title) AS title, client_id FROM project WHERE title = $1',
            values: [inputData.title.toLowerCase()],
        };

        if (inputData.client_id) {
            preparedQuery.text += ' AND id <> $2;';
            preparedQuery.values.push(inputData.client_id);
        }

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};
module.exports = dataMapper;
