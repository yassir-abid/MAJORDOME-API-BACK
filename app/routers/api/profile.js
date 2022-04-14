const express = require('express');

const validate = require('../../validation/validator');
const updateSchema = require('../../validation/schemas/profileUpdateSchema');

const authenticateToken = require('../../middlewares/authenticateToken');
const { cache, flush } = require('../../middlewares/cache');
const controllerHandler = require('../../helpers/controllerHandler');

const profileController = require('../../controllers/api/profile');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/profile
     * @summary Get one profile
     * @tags Profile
     * @security BearerAuth
     * @returns {Profile} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Profile not found - application/json
     */
    .get(authenticateToken, cache, controllerHandler(profileController.getOne))
    /**
     * PATCH /api/profile
     * @summary Update one profile
     * @tags Profile
     * @security BearerAuth
     * @param {InputProfile} request.body.required - profile info
     * @returns {Profile} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Profile not found - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), flush, controllerHandler(profileController.update))
    /**
     * DELETE /api/profile
     * @summary Delete one profile
     * @tags Profile
     * @security BearerAuth
     * @returns 204 - success response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Profile not found - application/json
     */
    .delete(authenticateToken, flush, controllerHandler(profileController.delete));

module.exports = router;
