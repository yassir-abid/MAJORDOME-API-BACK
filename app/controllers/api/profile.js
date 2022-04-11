const debug = require('debug')('ProfileController');
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
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw ApiError('Profile not found', { statusCode: 404 });
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
     * @returns {Profile} Route API JSON response
     */
    async delete(request, response) {
        const profile = await profileDataMapper.findByPk(request.decoded.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        debug(profile);

        await profileDataMapper.delete(request.decoded.id);

        return response.status(204).json();
    },
};

module.exports = profileController;
