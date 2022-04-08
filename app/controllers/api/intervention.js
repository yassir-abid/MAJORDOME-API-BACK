const debug = require('debug')('InterventionController');

const interventionDataMapper = require('../../models/intervention');

const { ApiError } = require('../../helpers/errorHandler');

const interventionController = {
    /**
     * Intervention controller to get all interventions
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object
     * @returns {array<Intervention>} Route API JSON response
     */
    async getAll(request, response) {
        debug('getAll');
        const interventions = await interventionDataMapper.findAll();
        return response.json(interventions);
    },

    /**
     * Intervention controller to get a one intervention
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Intervention} Route API JSON response
     */
    async getOne(request, response) {
        debug('getOne');
        const intervention = await interventionDataMapper.findByPk(request.params.id);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        return response.json(intervention);
    },
};

module.exports = interventionController;
