const debug = require('debug')('DocumentController');
const documentDataMapper = require('../../models/document');
const { ApiError } = require('../../helpers/errorHandler');

const documentController = {

    /**
     * Document controller to get all the records.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {array<Document>} Route API JSON response
     */
    async getAll(request, response) {
        const documents = await documentDataMapper.findAll();

        debug(documents);

        return response.json(documents);
    },

    /**
     * Document controller to get one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getOne(request, response) {
        const document = await documentDataMapper.findByPk(request.params.id);

        debug(document);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        return response.json(document);
    },

    /**
     * Document controller to get document linked to one supplier.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getBySupplier(request, response) {
        const document = await documentDataMapper.findBySupplier(request.params.id);

        debug(document);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        return response.json(document);
    },

    /**
     * Document controller to get document linked to one client.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getByClient(request, response) {
        const document = await documentDataMapper.findByClient(request.params.id);

        debug(document);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        return response.json(document);
    },

    /**
     * Document controller to get document linked to one project.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getByProject(request, response) {
        const document = await documentDataMapper.findByProject(request.params.id);

        debug(document);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        return response.json(document);
    },

    /**
     * Document controller to get document linked to one intervention.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getByIntervention(request, response) {
        const document = await documentDataMapper.findByIntervention(request.params.id);

        debug(document);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        return response.json(document);
    },

    /**
     * Document controller to create a new document
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async create(request, response) {
        const savedDocument = await documentDataMapper.insert(request.body);

        debug(savedDocument);

        return response.json(savedDocument);
    },

    /**
     * Document controller to update one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async update(request, response) {
        const document = await documentDataMapper.findByPk(request.params.id);

        debug(document);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        // if (request.body.title) {
        //    const existingProject = await projectDataMapper.isUnique(
        //        request.body.title,
        //        request.params.id,
        //    );
        //    if (existingProject) {
        //        throw new ApiError('Project with this title already exists', { statusCode: 409 });
        //    }
        // }
        const savedDocument = await documentDataMapper.update(request.params.id, request.body);

        debug(savedDocument);

        return response.json(savedDocument);
    },

    /**
     * Document controller to delete a document record
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete(request, response) {
        const document = await documentDataMapper.findByPk(request.params.id);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        debug(document);

        await documentDataMapper.delete(request.params.id);

        return response.status(204).json();
    },

};

module.exports = documentController;
