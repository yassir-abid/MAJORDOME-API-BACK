const express = require('express');

const validate = require('../../validation/validator');

const updateSchema = require('../../validation/schemas/profileUpdateSchema');

const profileController = require('../../controllers/api/profile');

const authenticateToken = require('../../middlewares/authenticateToken');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
/**
     * GET /api/profile
     * @summary Get one profile
     * @tags Profile
     * @security BearerAuth
     * @return {Profile} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Profile not found - application/json
     */
    .get(authenticateToken, controllerHandler(profileController.getOne))
// router.get('/:id(\\d+)', authenticateToken, controllerHandler(controller.getOne));

/**
     * PATCH /api/profile
     * @summary Update one profile
     * @tags Profile
     * @security BearerAuth
     * @param {InputProfile} request.body.required - profile info
     * @return {Profile} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Profile not found - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(profileController.update))
/**
     * DELETE /api/profile
     * @summary Delete one profile
     * @tags Profile
     * @security BearerAuth
     * @return 204 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Profile not found - application/json
     */

    .delete(authenticateToken, controllerHandler(profileController.delete));

module.exports = router;
