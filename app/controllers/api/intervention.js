/* eslint-disable max-len */
const debug = require('debug')('InterventionController');

const interventionDataMapper = require('../../models/intervention');
const addressDataMapper = require('../../models/address');
const pictureDataMapper = require('../../models/picture');
// const projectDataMapper = require('../../models/project');

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
     * Intervention controller to get all interventions of the day
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object
     * @returns {array<Intervention>} Route API JSON response
     */
    async getAllOfDay(request, response) {
        debug('getAllOfDay');
        const interventions = await interventionDataMapper.findAllOfDay();
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
        const intervention = await interventionDataMapper.findByPkWithDetails(request.params.id);

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
        // todo add project verification
        // const project = await projectDataMapper.findByPk(request.body.project_id);
        // if (!project) {
        //     throw new ApiError('This project does not exists', { statusCode: 404 });
        // }
        const address = await addressDataMapper.findByPk(request.body.address_id);
        if (!address) {
            throw new ApiError('This address does not exists', { statusCode: 404 });
        }
        const clientAddresses = await interventionDataMapper.findClientAddresses(request.body.project_id);
        const foundAddress = clientAddresses.find((clientAddress) => clientAddress.id === Number(request.body.address_id));
        if (!foundAddress) {
            throw new ApiError('This address_id does not match with any intervention client addresses', { statusCode: 409 });
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
        const intervention = await interventionDataMapper.findByPk(request.params.id);
        if (!intervention) {
            throw new ApiError('This intervention does not exists', { statusCode: 404 });
        }

        if (request.body.address_id) {
            const address = await addressDataMapper.findByPk(request.body.address_id);
            if (!address) {
                throw new ApiError('This address does not exists', { statusCode: 404 });
            }
            let clientAddresses;
            if (request.body.project_id) {
                // todo add project verification
                // const project = await projectDataMapper.findByPk(request.body.project_id);
                // if (!project) {
                //     throw new ApiError('This project does not exists', { statusCode: 404 });
                // }
                clientAddresses = await interventionDataMapper.findClientAddresses(request.body.project_id);
            } else {
                clientAddresses = await interventionDataMapper.findClientAddresses(intervention.project_id);
            }
            const foundAddress = clientAddresses.find((clientAddress) => clientAddress.id === Number(request.body.address_id));
            if (!foundAddress) {
                throw new ApiError('This address_id does not match with any intervention client addresses', { statusCode: 409 });
            }
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

    /**
     * Intervention controller to get intervention report by intervention id
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Report} Route API JSON response
     */
    async getReport(request, response) {
        debug('getReport');
        const intervention = await interventionDataMapper.findByPk(request.params.id);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const report = await interventionDataMapper.findReport(request.params.id);

        return response.json(report);
    },

    /**
     * Intervention controller to get intervention pictures by intervention id
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {array<Picture>} Route API JSON response
     */
    async getPictures(request, response) {
        debug('getPictures');
        const intervention = await interventionDataMapper.findByPk(request.params.id);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const pictures = await pictureDataMapper.findPictures(request.params.id);

        return response.json(pictures);
    },

    /**
     * Intervention controller to add a new picture
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Picture} Route API JSON response
     */
    async addPicture(request, response) {
        debug('addPicture');
        const intervention = await interventionDataMapper.findByPk(request.params.id);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const savedPicture = await pictureDataMapper.insert(request.body, request.params.id);
        response.json(savedPicture);
    },
};

module.exports = interventionController;
