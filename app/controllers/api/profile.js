const debug = require('debug')('ProfileController');
const profileDataMapper = require('../../models/profile');
const { ApiError } = require('../../helpers/errorHandler');
//const cache = require('../../helpers/cache');


const profileController = {

    async getOne(request, response) {
        const profile = await profileDataMapper.findByPk(request.params.id);

        if (!profile) {
            throw ApiError('Profile not found', { statusCode: 404 });
        }

        return response.json(profile);
    },

    async update(request, response) {
        const profile = await profileDataMapper.findByPk(request.params.id);

        if (!profile) {
            throw new ApiError('Profile not found', { statusCode: 404 });
        }

        if (request.body.email) {
            const existingEmail = await profileDataMapper.isUnique(request.body, request.params.id);

            if (existingEmail) {
                throw new ApiError(`Other user exists with this email`, { statusCode: 400 });
            }
        }

        const savedProfile = await profileDataMapper.update(request.params.id, request.body);
        return response.json(savedProfile);
    },

    async delete(request, response) {
        const profile = await profileDataMapper.findByPk(request.params.id);

        if (!profile) {
            throw new ApiError(`Profile not found`, { statusCode: 404 });
        }

        await profileDataMapper.delete(request.params.id);

        return response.status(204).json();
    },
};

module.exports = profileController;
