const debug = require('debug')('Project');
const client = require('../config/db');

const dataMapper ={

    /**
     * @returns {array<Projects>} - All projects of the database and their addresses
     */
    async findAll() {
        const result = await client.query(`SELECT * FROM project`);

        debug(result);

        return result.rows;
    },

    /**
     * Find project by id
     * @param {number} projectId - id of the desired project
     * @returns {(Project|undefined)} -
     * The desired project or undefined if no project found with this id
     */
    async findByPk(projectId) {
        const preparedQuery = {
            text: `SELECT * FROM project WHERE id = $1`,
            values: [projectId],
        };

        const result = await client.query(preparedQuery);
        if (rowCount === 0) {
            return undefined;
        }
        debug(result);

        return result.rows[0];
    },

    async insert(projectInfos) {
        const preparedQuery = {
            text: `INSERT INTO project
            (title, description, comments, client_id),
            VALUES ($1, $2, $3, $4) RETURNING *`,
            values: [projectInfos.title, projectInfos.description,
                projectInfos.comments, projectInfos.client_id],
        }
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
        const preparedQuery = {
            text: `SELECT * FROM project WHERE id = $1`,
            values: [id],
        };

        const result = await client.query(preparedQuery);

        debug(result);

        return !!result.rowCount;
    },

    /**
     * Checks if a project already exists with the same title
     * @param {object} inputData - Data provided
     * @param {number} projectId - Project id (optional)
     * @returns {(Project|null)} - The existing project
     * or null if no project exists with this data
     */
    async isUnique(inputData, projectId) {
        debug('isUnique');
        const preparedQuery = {
            text: 'SELECT * FROM project WHERE email = $1',
            values: [inputData.title],
        };

        if (projectId) {
            preparedQuery.text += ' AND id <> $2;';
            preparedQuery.values.push(projectId);
        }

        const result = await client.query(preparedQuery);

        debug(result);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};

module.exports = dataMapper;
