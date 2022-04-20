/* eslint-disable max-len */
const express = require('express');

const authenticateToken = require('../../middlewares/authenticateToken');
const upload = require('../../middlewares/upload');
const controllerHandler = require('../../helpers/controllerHandler');

const validate = require('../../validation/validator');
// const createSchema = require('../../validation/schemas/documentCreateSchema');
const updateSchema = require('../../validation/schemas/documentUpdateSchema');

const documentController = require('../../controllers/api/document');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/documents
     * @summary Get all documents
     * @tags Document
     * @security BearerAuth
     * @returns {array<Document>} 200 - success response - application/json
     */
    .get(authenticateToken, controllerHandler(documentController.getAll))
    /**
     * POST /api/documents
     * @summary Create a document
     * @tags Document
     * @security BearerAuth
     * @param {InputDocument} request.body.required - document informations - multipart/form-data
     * @returns {Document} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Document not found - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     */
    .post(authenticateToken, controllerHandler(upload), controllerHandler(documentController.create));
// .post(authenticateToken, validate('body', createSchema), upload, controllerHandler(documentController.create));

router
    .route('/clients/:id(\\d+)')
    /**
     * GET /api/documents/clients/{id}
     * @summary Get documents by client id
     * @tags Document
     * @security BearerAuth
     * @param {number} id.path.required - client identifier
     * @returns {Document} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Document not found - application/json
     */
    .get(authenticateToken, controllerHandler(documentController.getByClient));

router
    .route('/projects/:id(\\d+)')

    /**
          * GET /api/documents/projects/{id}
          * @summary Get documents by project id
          * @tags Document
          * @security BearerAuth
          * @param {number} id.path.required - project identifier
          * @returns {Document} 200 - success response - application/json
          * @returns {ApiError} 409 - Conflict response - application/json
          * @returns {ApiError} 404 - Document not found - application/json
          */
    .get(authenticateToken, controllerHandler(documentController.getByProject));

router
    .route('/interventions/:id(\\d+)')
    /**
     * GET /api/documents/interventions/{id}
     * @summary Get documents by intervention id
     * @tags Document
     * @security BearerAuth
     * @param {number} id.path.required - intervention identifier
     * @returns {Document} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Document not found - application/json
     */
    .get(authenticateToken, controllerHandler(documentController.getByIntervention));

router
    .route('/suppliers/:id(\\d+)')
    /**
     * GET /api/documents/suppliers/{id}
     * @summary Get documents by supplier id
     * @tags Document
     * @security BearerAuth
     * @param {number} id.path.required - supplier identifier
     * @returns {Document} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Document not found - application/json
     */
    .get(authenticateToken, controllerHandler(documentController.getBySupplier));

router
    .route('/:id(\\d+)/details')
    /**
     * PATCH /api/documents/{id}/details
     * @summary Update one document details (title, description, supplier/client/project/intervention id)
     * @tags Document
     * @security BearerAuth
     * @param {number} id.path.required - document identifier
     * @param {InputDocumentDetails} request.body.required - document informations to update
     * @returns {Document} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Document not found - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(documentController.updateDetails));

router
    .route('/:id(\\d+)/file')
    /**
     * PATCH /api/documents/{id}/file
     * @summary Upload new document file
     * @tags Document
     * @security BearerAuth
     * @param {number} id.path.required - document identifier
     * @param {InputDocumentFile} request.body.required - new document file to upload - multipart/form-data
     * @returns {Document} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Document not found - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     */
    .patch(authenticateToken, controllerHandler(upload), controllerHandler(documentController.updateFile));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/documents/{id}
     * @summary Get one document
     * @tags Document
     * @security BearerAuth
     * @param {number} id.path.required - document identifier
     * @returns {ClientWithAddress} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Document not found - application/json
     */
    .get(authenticateToken, controllerHandler(documentController.getOne))
    /**
     * DELETE /api/documents/{id}
     * @summary Delete one document
     * @tags Document
     * @security BearerAuth
     * @param {number} id.path.required - document identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - ocument not found - application/json
     */

    .delete(authenticateToken, controllerHandler(documentController.delete));

module.exports = router;
