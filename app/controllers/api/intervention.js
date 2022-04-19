/* eslint-disable max-len */
const debug = require('debug')('InterventionController');
const dayjs = require('dayjs');
const interventionDataMapper = require('../../models/intervention');
const addressDataMapper = require('../../models/address');
const projectDataMapper = require('../../models/project');

const { ApiError } = require('../../helpers/errorHandler');

const interventionController = {
    /**
     * Intervention controller to get all interventions
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object
     * @returns {array<InterventionWithProjectAndClient>} Route API JSON response
     */
    async getAll(request, response) {
        debug('getAll');
        const interventions = await interventionDataMapper.findAllWithDetails(request.decoded.id);
        return response.json(interventions);
    },

    /**
     * Intervention controller to get all interventions of the day
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object
     * @returns {array<Intervention>} Route API JSON response
     */
    async getAllOfDay(request, response) {
        debug('getAllOfDay');
        const interventions = await interventionDataMapper.findAllOfDay(request.decoded.id);
        return response.json(interventions);
    },

    /**
     * Intervention controller to get a one intervention
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {InterventionWithProjectAndClient} Route API JSON response
     */
    async getOne(request, response) {
        debug('getOne');
        const intervention = await interventionDataMapper.findByPkWithDetails(request.params.id, request.decoded.id);

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
        const project = await projectDataMapper.findByPk(request.body.project_id, request.decoded.id);
        if (!project) {
            throw new ApiError('Project not found', { statusCode: 404 });
        }
        const address = await addressDataMapper.findByPk(request.body.address_id, request.decoded.id);
        if (!address) {
            throw new ApiError('Address not found', { statusCode: 404 });
        }
        const clientAddresses = await interventionDataMapper.findClientAddresses(request.body.project_id);
        const foundAddress = clientAddresses.find((clientAddress) => clientAddress.id === Number(request.body.address_id));
        if (!foundAddress) {
            throw new ApiError('This address_id does not match with any intervention client addresses', { statusCode: 409 });
        }
        if (new Date(request.body.end_date) <= new Date(request.body.date)) {
            throw new ApiError('End date can\'t be inferior than start date', { statusCode: 409 });
        }
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

        const intervention = await interventionDataMapper.findByPk(request.params.id, request.decoded.id);
        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        if (request.body.address_id) {
            const address = await addressDataMapper.findByPk(request.body.address_id, request.decoded.id);
            if (!address) {
                throw new ApiError('Address not found', { statusCode: 404 });
            }
        }

        if (request.body.project_id) {
            const project = await projectDataMapper.findByPk(request.body.project_id, request.decoded.id);
            if (!project) {
                throw new ApiError('Project not found', { statusCode: 404 });
            }
        }

        if (request.body.address_id || request.body.project_id) {
            let clientAddresses;
            if (request.body.project_id) {
                clientAddresses = await interventionDataMapper.findClientAddresses(request.body.project_id);
            } else {
                clientAddresses = await interventionDataMapper.findClientAddresses(intervention.project_id);
            }
            let foundAddress;
            if (request.body.address_id) {
                foundAddress = clientAddresses.find((clientAddress) => clientAddress.id === Number(request.body.address_id));
            } else {
                foundAddress = clientAddresses.find((clientAddress) => clientAddress.id === Number(intervention.address_id));
            }
            if (!foundAddress) {
                throw new ApiError('Intervention address and client address does not match', { statusCode: 409 });
            }
        }

        if (request.body.end_date) {
            let startDate;
            if (request.body.date) {
                startDate = request.body.date;
            } else {
                startDate = intervention.date;
            }
            if (new Date(request.body.end_date) <= new Date(startDate)) {
                throw new ApiError('End date can\'t be inferior than start date', { statusCode: 409 });
            }
            request.body.duration = await interventionDataMapper.calculateDuration(startDate, request.body.end_date);
            delete request.body.end_date;
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
        const intervention = await interventionDataMapper.findByPk(request.params.id, request.decoded.id);
        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        await interventionDataMapper.delete(request.params.id, intervention.project_id);
        return response.status(204).json();
    },

    /**
     * Intervention controller to get intervention report by intervention id
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Report} Route API JSON response
     */
    async getReport(request, response) {
        debug('getReport');
        const intervention = await interventionDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const report = await interventionDataMapper.findReport(request.params.id);

        return response.json(report);
    },
};

module.exports = interventionController;
