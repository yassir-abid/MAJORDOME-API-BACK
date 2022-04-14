/* eslint-disable max-len */
const debug = require('debug')('ProfileController');
const profileDataMapper = require('../../models/profile');
const { ApiError } = require('../../helpers/errorHandler');

const baseUrl = process.env.BASE_FILE_URL;

const profileController = {

    /**
     * Profile controller to get one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async getOne(request, response) {
        debug('getOne');
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        debug(profile);

        return response.json(profile);
    },

    /**
     * Profile controller to update one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async update(request, response) {
        debug('update');
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }
        debug(profile);

        if (request.body.email) {
            const existingEmail = await profileDataMapper.isUnique(
                request.body,
                request.decoded.id,
            );

            debug(existingEmail);

            if (existingEmail) {
                throw new ApiError('Other user exists with this email', { statusCode: 409 });
            }
        }

        const savedProfile = await profileDataMapper.update(request.decoded.id, request.body);

        debug(savedProfile);

        return response.json(savedProfile);
    },

    /**
     * Profile controller to delete one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete(request, response) {
        debug('delete');
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        debug(profile);

        await profileDataMapper.delete(request.decoded.id);

        return response.status(204).json();
    },

    /**
     * Profile controller to add or update picture.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async addPicture(request, response) {
        debug('addPicture');
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        const savedProfile = await profileDataMapper.updatePicture(request.decoded.id, request.file.customName);

        savedProfile.picture = `${baseUrl}avatar/${profile.picture}`;

        return response.json(savedProfile);
    },

    /**
     * Profile controller to get profile picture
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns Route API JSON response
     */
    async getPicture(request, response) {
        debug('getPicture');
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        if (!profile.picture || profile.picture === '') {
            throw new ApiError('Picture Profile not found', { statusCode: 404 });
        }

        const path = `${baseUrl}avatar/${profile.picture}`;

        return response.json({ path });
    },

    /**
     * Profile controller to delete profile picture.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async deletePicture(request, response) {
        debug('deletePicture');
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        const savedProfile = await profileDataMapper.updatePicture(request.decoded.id);

        return response.json(savedProfile);
    },
};

module.exports = profileController;
