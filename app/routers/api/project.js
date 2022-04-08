const express = require('express');

const validate = require('../../validation/validator');

const createSchema = require('../../validation/schemas/projectCreateSchema');

const updateSchema = require('../../validation/schemas/projectUpdateSchema');

const projectController = require('../../controllers/api/project');

const authenticateToken = require('../../middlewares/authenticateToken');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/projects
     * @summary Get all projects
     * @tags Projects
     * @security BearerAuth
     * @returns {array<CProjects>} 200 - success response - application/json
     */
    .get(authenticateToken, controllerHandler(projectController.getAll))
    /**
     * POST /api/projects
     * @summary Create a projects
     * @tags projects
     * @security BearerAuth
     * @param {InsertProject} request.body.required - project informations
     * @returns {ClientWithAddress} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Client not found - application/json
     */
    .post(authenticateToken, validate('body', createSchema), controllerHandler(projectController.create));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/projects/{id}
     * @summary Get all projects
     * @tags Projects
     * @security BearerAuth
     * @returns {Project} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Profile not found - application/json
     */
    .get(authenticateToken, controllerHandler(projectController.getOne))
    /**
     * PATCH /api/projects/{id}
     * @summary Update one project
     * @tags Project
     * @security BearerAuth
     * @param {InputProject} request.body.required - project info
     * @returns {Project} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Profile not found - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(projectController.update))
    /**
     * DELETE /api/projects/{id}
     * @summary Delete one project
     * @tags Project
     * @security BearerAuth
     * @returns 204 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Profile not found - application/json
     */

    .delete(authenticateToken, controllerHandler(projectController.delete));

module.exports = router;
