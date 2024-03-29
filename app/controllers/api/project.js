/* eslint-disable max-len */
const debug = require('debug')('ProjectController');
const projectDataMapper = require('../../models/project');
const clientDataMapper = require('../../models/client');
const { ApiError } = require('../../helpers/errorHandler');

const projectController = {

    /**
     * Project controller to get all the records.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {array<ProjectWithClient>} Route API JSON response
     */
    async getAll(request, response) {
        debug('getAll');
        const projects = await projectDataMapper.findAll(request.decoded.id);

        return response.json(projects);
    },

    /**
     * Project controller to get one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {ProjectClientInterventions} Route API JSON response
     */
    async getOne(request, response) {
        debug('getOne');

        const project = await projectDataMapper.findByPkWithDetails(request.params.id, request.decoded.id);

        if (!project) {
            throw new ApiError('Project not found', { statusCode: 404 });
        }

        return response.json(project);
    },

    /**
     * Project controller to create a new project
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Project} Route API JSON response
     */
    async create(request, response) {
        debug('create');

        const client = await clientDataMapper.findByPk(request.body.client_id, request.decoded.id);

        if (!client) {
            throw new ApiError('Client not found', { statusCode: 404 });
        }

        const project = await projectDataMapper.isUnique(request.body);

        if (project) {
            throw new ApiError('Project with this title already exists for that client', { statusCode: 409 });
        }

        const savedProject = await projectDataMapper.insert(request.body);

        return response.json(savedProject);
    },

    /**
     * Project controller to update one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Project} Route API JSON response
     */
    async update(request, response) {
        debug('update');
        const project = await projectDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!project) {
            throw new ApiError('Project not found', { statusCode: 404 });
        }

        if (request.body.client_id) {
            const client = await clientDataMapper.findByPk(request.body.client_id, request.decoded.id);

            if (!client) {
                throw new ApiError('Client not found', { statusCode: 404 });
            }
        }

        if (request.body.title) {
            const existingProject = await projectDataMapper.isUnique(
                request.body,
            );
            if (existingProject) {
                throw new ApiError('Project with this title already exists for that client', { statusCode: 409 });
            }
        }

        const savedProject = await projectDataMapper.update(request.params.id, request.body);

        return response.json(savedProject);
    },

    /**
     * Project controller to delete a project record
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete(request, response) {
        debug('delete');
        const project = await projectDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!project) {
            throw new ApiError('Project not found', { statusCode: 404 });
        }

        await projectDataMapper.delete(request.params.id);

        return response.status(204).json();
    },

};

module.exports = projectController;
