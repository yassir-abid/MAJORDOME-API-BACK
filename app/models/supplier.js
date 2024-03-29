const debug = require('debug')('Supplier');
const client = require('../config/db');

/**
 * @typedef {object} Supplier
 * @property {number} id - Supplier id
 * @property {string} firstname - Supplier firstname
 * @property {string} lastname - Supplier lastname
 * @property {string} email - Supplier email
 * @property {string} phone - Supplier phone
 * @property {string} address - Supplier address
 * @property {string} comments - Supplier comments and specific informations
 * @property {number} provider_id - Id of the provider linked to the supplier
 */

/**
 * @typedef {object} InputSupplier
 * @property {string} firstname - Supplier firstname
 * @property {string} lastname - Supplier lastname
 * @property {string} email - Supplier email
 * @property {string} phone - Supplier phone
 * @property {string} address - Supplier address
 * @property {string} comments - Supplier comments and specific informations
 */

const dataMapper = {

    /**
      * @param {number} providerId - provider id
      * @returns {array<Suppliers>} - All suppliers of the database
      */
    async findAll(providerId) {
        debug('findAll');
        const preparedQuery = {
            text: 'SELECT * FROM supplier WHERE provider_id = $1 ORDER BY id ASC',
            values: [providerId],
        };

        const result = await client.query(preparedQuery);

        return result.rows;
    },

    /**
      * Find supplier by id
      * @param {number} supplierId - id of the desired supplier
      * @param {number} providerId - provider id
      * @returns {(Supplier|undefined)} -
      * The desired supplier or undefined if no supplier found with this id
      */
    async findByPk(supplierId, providerId) {
        debug('findByPk');
        const preparedQuery = {
            text: 'SELECT * FROM supplier WHERE id = $1 AND provider_id = $2',
            values: [supplierId, providerId],
        };

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
      * Add supplier in the database
      * @param {InputSupplier} supplierInfos - Data to insert
      * @returns {Supplier} - Inserted supplier
      */
    async insert(supplierInfos) {
        debug('insert');
        const preparedQuery = {
            text: `INSERT INTO supplier
             (firstname, lastname, email, phone, address, comments, provider_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
            values: [supplierInfos.firstname, supplierInfos.lastname, supplierInfos.email,
                supplierInfos.phone, supplierInfos.address, supplierInfos.comments,
                supplierInfos.provider_id],
        };
        const savedSupplier = await client.query(preparedQuery);

        return savedSupplier.rows[0];
    },

    /**
      * Update supplier
      * @param {number} id - id of the supplier to update
      * @param {InputSupplier} supplierInfos - Data to update
      * @returns {Supplier} - Updated supplier
      */
    async update(id, supplierInfos) {
        debug('update');
        const fields = Object.keys(supplierInfos).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(supplierInfos);

        const savedSupplier = await client.query(
            `UPDATE supplier SET
                 ${fields}
                 WHERE id = $${fields.length + 1}
                 RETURNING *`,
            [...values, id],
        );

        return savedSupplier.rows[0];
    },

    /**
      * Remove supplier from the database
      * @param {number} id - id of the supplier to delete
      * @returns {boolean} - Result of the delete operation
      */
    async delete(id) {
        debug('delete');
        const preparedQuery = {
            text: 'DELETE FROM supplier WHERE id = $1',
            values: [id],
        };

        const result = await client.query(preparedQuery);

        return !!result.rowCount;
    },

    /**
      * Checks if a supplier already exists with the same email
      * @param {object} inputData - Data provided
      * @param {number} supplierId - Supplier id (optional)
      * @returns {(Supplier|null)} - The existing supplier
      * or null if no supplier exists with this data
      */
    async isUnique(inputData, supplierId) {
        debug('isUnique');
        const preparedQuery = {
            text: 'SELECT * FROM supplier WHERE email = $1',
            values: [inputData.email],
        };

        if (supplierId) {
            preparedQuery.text += ' AND id <> $2;';
            preparedQuery.values.push(supplierId);
        }

        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};
module.exports = dataMapper;
