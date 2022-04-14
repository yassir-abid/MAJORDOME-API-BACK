/**
 * @typedef {object} Document
 * @property {number} id - Document id
 * @property {string} title - Document title
 * @property {string} description - Document description
 * @property {string} path - Document path
 * @property {number} supplier_id - Id of the supplier linked to the document
 * @property {number} client_id - Id of the client linked to the document
 * @property {number} project_id - Id of the project linked to the document
 * @property {number} intervention_id - Id of the intervention linked to the document
 */

/**
 * @typedef {object} InputDocument
 * @property {string} title - Document title
 * @property {string} description - Document description
 * @property {string} path - Document path
 */

const debug = require('debug')('Document');
const client = require('../config/db');

const dataMapper = {

    /**
      * @returns {array<Documents>} - All documents of the database
      */
    async findAll() {
        const result = await client.query('SELECT * FROM document ORDER BY title ASC');

        debug(result);

        return result.rows;
    },

    /**
      * Find document by id
      * @param {number} documentId - id of the desired document
      * @returns {(Document|undefined)} -
      * The desired document or undefined if no document found with this id
      */
    async findByPk(documentId) {
        const preparedQuery = {
            text: 'SELECT * FROM document WHERE id = $1',
            values: [documentId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }
        debug(result);

        return result.rows[0];
    },

    /**
      * Find document by supplier_id
      * @param {number} supplierId - id of the supplier linked to the document
      * @returns {(Document|undefined)} -
      * The desired document or undefined if no document found with this id
      */
    async findBySupplier(supplierId) {
        const preparedQuery = {
            text: 'SELECT * FROM document WHERE supplier_id = $1',
            values: [supplierId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        debug(result);

        return result.rows[0];
    },

    /**
      * Find document by client_id
      * @param {number} clientId - id of the client linked to the document
      * @returns {(Document|undefined)} -
      * The desired document or undefined if no document found with this id
      */
    async findByClient(clientId) {
        const preparedQuery = {
            text: 'SELECT * FROM document WHERE client_id = $1',
            values: [clientId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        debug(result);

        return result.rows[0];
    },

    /**
      * Find document by project_id
      * @param {number} projectId - id of the project linked to the document
      * @returns {(Document|undefined)} -
      * The desired document or undefined if no document found with this id
      */
    async findByProject(projectId) {
        const preparedQuery = {
            text: 'SELECT * FROM document WHERE project_id = $1',
            values: [projectId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        debug(result);

        return result.rows[0];
    },

    /**
      * Find document by intervention_id
      * @param {number} interventionId - id of the intervention linked to the document
      * @returns {(Document|undefined)} -
      * The desired document or undefined if no document found with this id
      */
    async findByIntervention(interventionId) {
        const preparedQuery = {
            text: 'SELECT * FROM document WHERE intervention_id = $1',
            values: [interventionId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        debug(result);

        return result.rows[0];
    },

    /**
      * Add document in the database
      * @param {InputDocument} documentInfos - Data to insert
      * @returns {Document} - Inserted document
      */
    async insert(documentInfos) {
        const preparedQuery = {
            text: `INSERT INTO document
             (title, description, path, supplier_id, client_id, project_id, intervention_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
            values: [documentInfos.title, documentInfos.description, documentInfos.path,
                documentInfos.supplier_id, documentInfos.client_id, documentInfos.project_id,
                documentInfos.intervention_id],
        };
        const savedDocument = await client.query(preparedQuery);

        debug(savedDocument);

        return savedDocument.rows[0];
    },

    /**
      * Update document
      * @param {number} id - id of the document to update
      * @param {InputDocument} documentInfos - Data to update
      * @returns {Document} - Updated document
      */
    async update(id, documentInfos) {
        const fields = Object.keys(documentInfos).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(documentInfos);

        debug(fields);
        debug(values);

        const savedDocument = await client.query(
            `UPDATE document SET
                 ${fields}
                 WHERE id = $${fields.length + 1}
                 RETURNING *`,
            [...values, id],
        );

        debug(savedDocument);

        return savedDocument.rows[0];
    },

    /**
      * Remove document from the database
      * @param {number} id - id of the document to delete
      * @returns {boolean} - Result of the delete operation
      */
    async delete(id) {
        const preparedQuery = {
            text: 'DELETE FROM document WHERE id = $1',
            values: [id],
        };

        const result = await client.query(preparedQuery);

        debug(result);

        return !!result.rowCount;
    },
};
module.exports = dataMapper;
