const debug = require('debug')('ProfileController');
const path = require('path');
const profileDataMapper = require('../../models/profile');
const { ApiError } = require('../../helpers/errorHandler');

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
     * Profile controller to download picture
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

        return response.download(profile.picture);
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
     * Profile controller to update picture.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async updatePicture(request, response) {
        debug('updatePicture');
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        const directoryPath = path.join(__dirname, '/../../assets/uploads/');
        const picturePath = directoryPath + request.file.customName;
        const savedProfile = await profileDataMapper.updatePicture(request.decoded.id, picturePath);

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
