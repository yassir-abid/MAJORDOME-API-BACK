const debug = require('debug')('ProjectController');
const projectDataMapper = require('../../models/project');
const { ApiError } = require('../../helpers/errorHandler');

const projectController = {

    /**
     * Project controller to get all the records.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async getAll(request, response) {
        const projects = await projectDataMapper.findAll();

        debug(projects);

        return response.json(projects);
    },

    /**
     * Project controller to get one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async getOne(request, response) {
        const project = await projectDataMapper.findByPkWithClient(request.params.id);

        debug(project);

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
        const project = await projectDataMapper.isUnique(request.body);

        debug(project);

        if (project) {
            throw new ApiError('Project with this title already exists', { statusCode: 409 });
        }
        const savedProject = await projectDataMapper.insert(request.body);

        debug(savedProject);

        return response.json(savedProject);
    },

    /**
     * Project controller to update one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async update(request, response) {
        const project = await projectDataMapper.findByPk(request.params.id);

        debug(project);

        if (!project) {
            throw new ApiError('Project not found', { statusCode: 404 });
        }

        if (request.body.title) {
            const existingProject = await projectDataMapper.isUnique(
                request.body.title,
                request.params.id,
            );
            if (existingProject) {
                throw new ApiError('Project with this title already exists', { statusCode: 409 });
            }
        }
        const savedProject = await projectDataMapper.update(request.params.id, request.body);

        debug(savedProject);

        return response.json(savedProject);
    },

    /**
     * Project controller to delete a project record
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete (request, response) {
        const project = await projectDataMapper.findByPk(request.params.id);

        if (!project) {
            throw new ApiError('Project not found', { statusCode: 404 });
        }

        debug(project);

        await projectDataMapper.delete(request.params.id);

        return response.status(204).json();
    },

};

module.exports = projectController;
