/* eslint-disable max-len */
const debug = require('debug')('DocumentController');
const documentDataMapper = require('../../models/document');
const clientDataMapper = require('../../models/client');
const projectDataMapper = require('../../models/project');
const interventionDataMapper = require('../../models/intervention');
const { ApiError } = require('../../helpers/errorHandler');

const baseUrl = process.env.BASE_FILE_URL;

const documentController = {

    /**
     * Document controller to get all the records.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {array<Document>} Route API JSON response
     */
    async getAll(request, response) {
        debug('getAll');
        const documents = await documentDataMapper.findAll(request.decoded.id);

        documents.forEach((document) => {
            let url;
            if (!document.path || document.path === '') {
                url = null;
            } else {
                url = `${baseUrl}file/${document.path}`;
            }
            document.path = url;
        });

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
        debug('getOne');
        const document = await documentDataMapper.findByPk(request.params.id, request.decoded.id);

        debug(document);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        let url;
        if (!document.path || document.path === '') {
            url = null;
        } else {
            url = `${baseUrl}file/${document.path}`;
        }
        document.path = url;

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
        debug('getBySupplier');
        const documents = await documentDataMapper.findBySupplier(request.params.id, request.decoded.id);

        if (documents.length === 0) {
            throw new ApiError('Nothing found', { statusCode: 404 });
        }

        documents.forEach((document) => {
            let url;
            if (!document.path || document.path === '') {
                url = null;
            } else {
                url = `${baseUrl}file/${document.path}`;
            }
            document.path = url;
        });

        return response.json(documents);
    },

    /**
     * Document controller to get document linked to one client.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getByClient(request, response) {
        debug('getByClient');
        const documents = await documentDataMapper.findByClient(request.params.id, request.decoded.id);

        if (documents.length === 0) {
            throw new ApiError('Nothing found', { statusCode: 404 });
        }

        documents.forEach((document) => {
            let url;
            if (!document.path || document.path === '') {
                url = null;
            } else {
                url = `${baseUrl}file/${document.path}`;
            }
            document.path = url;
        });

        return response.json(documents);
    },

    /**
     * Document controller to get document linked to one project.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getByProject(request, response) {
        debug('getByProject');
        const documents = await documentDataMapper.findByProject(request.params.id, request.decoded.id);

        if (documents.length === 0) {
            throw new ApiError('Nothing found', { statusCode: 404 });
        }

        documents.forEach((document) => {
            let url;
            if (!document.path || document.path === '') {
                url = null;
            } else {
                url = `${baseUrl}file/${document.path}`;
            }
            document.path = url;
        });

        return response.json(documents);
    },

    /**
     * Document controller to get document linked to one intervention.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async getByIntervention(request, response) {
        debug('getByIntervention');
        const documents = await documentDataMapper.findByIntervention(request.params.id, request.decoded.id);

        if (documents.length === 0) {
            throw new ApiError('Nothing found', { statusCode: 404 });
        }

        documents.forEach((document) => {
            let url;
            if (!document.path || document.path === '') {
                url = null;
            } else {
                url = `${baseUrl}file/${document.path}`;
            }
            document.path = url;
        });

        return response.json(documents);
    },

    /**
     * Document controller to create a new document
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async create(request, response) {
        debug('create');
        if (!request.body.client_id && !request.body.project_id && !request.body.intervention_id && !request.body.supplier_id) {
            throw new ApiError('Document must be attached to a client, a project, an intervention or a supplier', { statusCode: 409 });
        }
        if (request.body.client_id) {
            const client = await clientDataMapper.findByPk(request.body.client_id, request.decoded.id);
            if (!client) {
                throw new ApiError('Client not found', { statusCode: 404 });
            }
        }
        if (request.body.project_id) {
            const project = await projectDataMapper.findByPk(request.body.project_id, request.decoded.id);
            if (!project) {
                throw new ApiError('Project not found', { statusCode: 404 });
            }
        }
        if (request.body.intervention_id) {
            const intervention = await interventionDataMapper.findByPk(request.body.intervention_id, request.decoded.id);
            if (!intervention) {
                throw new ApiError('Intervention not found', { statusCode: 404 });
            }
        }

        // if (request.body.supplier_id) {
        //     const supplier = await supplierDataMapper.findByPk(request.body.supplier_id, request.decoded.id);
        //     if (!supplier) {
        //         throw new ApiError('Client not found', { statusCode: 404 });
        //     }
        // }

        request.body.path = request.file.customName;

        const savedDocument = await documentDataMapper.insert(request.body);

        if (!savedDocument.path || savedDocument.path === '') {
            savedDocument.path = null;
        } else {
            savedDocument.path = `${baseUrl}file/${savedDocument.path}`;
        }

        return response.json(savedDocument);
    },

    /**
     * Document controller to update one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async updateDetails(request, response) {
        debug('updateDetails');
        const document = await documentDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        if (request.body.client_id) {
            const client = await clientDataMapper.findByPk(request.body.client_id, request.decoded.id);
            if (!client) {
                throw new ApiError('Client not found', { statusCode: 404 });
            }
        }
        if (request.body.project_id) {
            const project = await projectDataMapper.findByPk(request.body.project_id, request.decoded.id);
            if (!project) {
                throw new ApiError('Project not found', { statusCode: 404 });
            }
        }
        if (request.body.intervention_id) {
            const intervention = await interventionDataMapper.findByPk(request.body.intervention_id, request.decoded.id);
            if (!intervention) {
                throw new ApiError('Intervention not found', { statusCode: 404 });
            }
        }
        // if (request.body.supplier_id) {
        //     const supplier = await supplierDataMapper.findByPk(request.body.supplier_id, request.decoded.id);
        //     if (!supplier) {
        //         throw new ApiError('Client not found', { statusCode: 404 });
        //     }
        // }
        const savedDocument = await documentDataMapper.update(request.params.id, request.body);

        if (!savedDocument.path || savedDocument.path === '') {
            savedDocument.path = null;
        } else {
            savedDocument.path = `${baseUrl}file/${savedDocument.path}`;
        }

        return response.json(savedDocument);
    },

    /**
     * Document controller to update one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Document} Route API JSON response
     */
    async updateFile(request, response) {
        debug('updateFile');
        const document = await documentDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        request.body.path = request.file.customName;

        const savedDocument = await documentDataMapper.update(request.params.id, request.body);

        if (!savedDocument.path || savedDocument.path === '') {
            savedDocument.path = null;
        } else {
            savedDocument.path = `${baseUrl}file/${savedDocument.path}`;
        }

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
        debug('delete');
        const document = await documentDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!document) {
            throw new ApiError('Document not found', { statusCode: 404 });
        }

        debug(document);

        await documentDataMapper.delete(request.params.id);

        return response.status(204).json();
    },

};

module.exports = documentController;
