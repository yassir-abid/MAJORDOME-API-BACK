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

    /**
     * Intervention controller to create a new intervention
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Intervention} Route API JSON response
     */
    async create(request, response) {
        debug('create');
        const savedintervention = await interventionDataMapper.insert(request.body);
        return response.json(savedintervention);
    },

    /**
     * Intervention controller to update a record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Intervention} Route API JSON response
     */
    async update(request, response) {
        debug('Update');
        const intervention = await interventionDataMapper.findByPk(request.params.id);
        if (!intervention) {
            throw new ApiError('This intervention does not exists', { statusCode: 404 });
        }
        const savedIntervention = await interventionDataMapper.update(
            request.params.id,
            request.body,
        );
        return response.json(savedIntervention);
    },

    /**
     * Intervention controller to delete an intervention record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete(request, response) {
        debug('delete');
        const intervention = await interventionDataMapper.findByPk(request.params.id);
        if (!intervention) {
            throw new ApiError('This client does not exists', { statusCode: 404 });
        }

        await interventionDataMapper.delete(request.params.id);
        return response.status(204).json();
    },
};

module.exports = interventionController;
