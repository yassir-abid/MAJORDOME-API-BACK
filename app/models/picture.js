const debug = require('debug')('PictureDataMapper');
const client = require('../config/db');

/**
 * @typedef {object} Picture
 * @property {number} id - Picture id
 * @property {string} title - Picture title
 * @property {string} status - Picture title (before/after intervention)
 * @property {string} path - Picture path
 * @property {number} intervention_id - Id of the intervention linked to the picture
 */

/**
 * @typedef {object} InputPicture
 * @property {string} title - Picture title
 * @property {string} status - Picture title (before/after intervention)
 * @property {string} file - Picture path - binary
 */

const pictureDataMapper = {
    /**
     * Find intervention pictures by intervention id
     * @param {number} interventionId - id of the desired intervention
     * @returns {(array<Picture>|undefined)} -
     * The desired intervention pictures or undefined if no intervention found with this id
     */
    async findAll(interventionId) {
        debug('findAll');
        const preparedQuery = {
            text: 'SELECT * FROM picture WHERE intervention_id = $1;',
            values: [interventionId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows;
    },

    /**
     * Find picture by id
     * @param {number} pictureId - id of the desired picture
     * @returns {(Intervention|undefined)} -
     * The desired picture or undefined if no picture found with this id
     */
    async findByPk(pictureId) {
        debug('findByPk');
        const preparedQuery = {
            text: 'SELECT * FROM picture WHERE id = $1;',
            values: [pictureId],
        };
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Add picture in the database
     * @param {InputPicture} picture - Data to insert
     * @param {number} interventionId - Intervention id linked to the picture
     * @returns {Picture} - Inserted intervention
     */
    async insert(picture, interventionId) {
        debug('insert');
        const preparedQuery = {
            text: ` INSERT INTO picture
            (title, status, path, intervention_id) VALUES
            ($1, $2, $3, $4) RETURNING *;`,
            values: [picture.title, picture.status, picture.path, interventionId],
        };
        const savedPicture = await client.query(preparedQuery);

        return savedPicture.rows[0];
    },

    /**
     * Update picture
     * @param {number} id - picture id
     * @param {InputPicture} picture - Data to edit
     * @returns {Picture} - Edited picture
     */
    async update(id, picture) {
        debug('update');

        const fields = Object.keys(picture).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(picture);

        const savedPicture = await client.query(
            `
                UPDATE picture SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *;
            `,
            [...values, id],
        );

        return savedPicture.rows[0];
    },

    /**
     * Remove picture from the database
     * @param {number} id - id of the picture to delete
     * @returns {boolean} - Result of the delete operation
     */
    async delete(id) {
        debug('delete');
        const preparedQuery = {
            text: 'DELETE FROM picture WHERE id = $1',
            values: [id],
        };
        const result = await client.query(preparedQuery);
        return !!result.rowCount;
    },
};

module.exports = pictureDataMapper;
