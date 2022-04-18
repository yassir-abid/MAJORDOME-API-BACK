const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/clientCreateSchema');
const updateSchema = require('../../validation/schemas/clientUpdateSchema');

const authenticateToken = require('../../middlewares/authenticateToken');

const { clientController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/clients
     * @summary Get all clients and their addresses
     * @tags Client
     * @security BearerAuth
     * @returns {array<ClientAddressesProject>} 200 - success response - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getAll))
    /**
     * POST /api/clients
     * @summary Create a client and his addresses
     * @tags Client
     * @security BearerAuth
     * @param {InsertClientWithAddress} request.body.required - client informations
     * @returns {ClientWithAddress} 201 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Client not found - application/json
     */
    .post(authenticateToken, validate('body', createSchema), controllerHandler(controller.create));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/clients/{id}
     * @summary Get one client, his addresses, his projects and interventions
     * @tags Client
     * @security BearerAuth
     * @param {number} id.path.required - client identifier
     * @returns {ClientAddressesProject} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Client not found - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getOne))
    /**
     * PATCH /api/clients/{id}
     * @summary Update one client and update or create his addresses
     * @tags Client
     * @security BearerAuth
     * @param {number} id.path.required - client identifier
     * @param {UpdateClientWithAddress} request.body.required - client informations
     * @returns {ClientWithAddress} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Client not found - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(controller.update))
    /**
     * DELETE /api/clients/{id}
     * @summary Delete one client
     * @tags Client
     * @security BearerAuth
     * @param {number} id.path.required - client identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Client not found - application/json
     */
    .delete(authenticateToken, controllerHandler(controller.delete));

router
    .route('/address/:addressId(\\d+)')
    /**
     * DELETE /api/clients/address/{addressId}
     * @summary Delete a client's address
     * @tags Client
     * @security BearerAuth
     * @param {number} addressId.path.required - address identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 409 - Bad request response - application/json
     * @returns {ApiError} 404 - Client not found - application/json
     */
    .delete(authenticateToken, controllerHandler(controller.deleteAddress));

module.exports = router;
