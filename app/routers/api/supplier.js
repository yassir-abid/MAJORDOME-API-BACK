const express = require('express');

const validate = require('../../validation/validator');

const createSchema = require('../../validation/schemas/supplierCreateSchema');

const updateSchema = require('../../validation/schemas/supplierUpdateSchema');

const supplierController = require('../../controllers/api/supplier');

const authenticateToken = require('../../middlewares/authenticateToken');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/suppliers
     * @summary Get all suppliers
     * @tags Supplier
     * @security BearerAuth
     * @returns {array<Supplier>} 200 - success response - application/json
     */
    .get(authenticateToken, controllerHandler(supplierController.getAll))
    /**
     * POST /api/suppliers
     * @summary Create a supplier
     * @tags Supplier
     * @security BearerAuth
     * @param {InputSupplier} request.body.required - supplier informations
     * @returns {Supplier} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Supplier not found - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     */
    .post(authenticateToken, validate('body', createSchema), controllerHandler(supplierController.create));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/suppliers/{id}
     * @summary Get one supplier
     * @tags Supplier
     * @security BearerAuth
     * @param {number} id.path.required - supplier identifier
     * @returns {InputSupplier} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Supplier not found - application/json
     */
    .get(authenticateToken, controllerHandler(supplierController.getOne))
    /**
     * PATCH /api/suppliers/{id}
     * @summary Update one supplier
     * @tags Supplier
     * @security BearerAuth
     * @param {number} id.path.required - supplier identifier
     * @param {InputSupplier} request.body.required - supplier info
     * @returns {Supplier} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Supplier not found - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(supplierController.update))
    /**
     * DELETE /api/suppliers/{id}
     * @summary Delete one supplier
     * @tags Supplier
     * @security BearerAuth
     * @param {number} id.path.required - supplier identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Supplier not found - application/json
     */

    .delete(authenticateToken, controllerHandler(supplierController.delete));

module.exports = router;
