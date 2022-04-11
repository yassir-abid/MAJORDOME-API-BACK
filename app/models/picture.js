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
 * @property {string} path - Picture path
 */

const pictureDataMapper = {
    /**
     * Find intervention pictures by intervention id
     * @param {number} interventionId - id of the desired intervention
     * @returns {(array<Picture>|undefined)} -
     * The desired intervention pictures or undefined if no intervention found with this id
     */
    async findPictures(interventionId) {
        debug('findPictures');
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
};

module.exports = pictureDataMapper;
