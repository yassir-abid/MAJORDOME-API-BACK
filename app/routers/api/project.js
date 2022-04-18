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
     * @tags Project
     * @security BearerAuth
     * @returns {array<ProjectWithClient>} 200 - success response - application/json
     */
    .get(authenticateToken, controllerHandler(projectController.getAll))
    /**
     * POST /api/projects
     * @summary Create a project
     * @tags Project
     * @security BearerAuth
     * @param {InputProject} request.body.required - project informations
     * @returns {Project} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Project not found - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     */
    .post(authenticateToken, validate('body', createSchema), controllerHandler(projectController.create));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/projects/{id}

     * @summary Get one project, his client and all his interventions
     * @tags Project
     * @security BearerAuth
     * @param {number} id.path.required - project identifier
     * @returns {ProjectClientInterventions} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Project not found - application/json
     */
    .get(authenticateToken, controllerHandler(projectController.getOne))
    /**
     * PATCH /api/projects/{id}
     * @summary Update one project
     * @tags Project
     * @security BearerAuth
     * @param {number} id.path.required - project identifier
     * @param {InputProject} request.body.required - project info
     * @returns {Project} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Project not found - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(projectController.update))
    /**
     * DELETE /api/projects/{id}
     * @summary Delete one project
     * @tags Project
     * @security BearerAuth
     * @param {number} id.path.required - project identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 409 - Conflict response - application/json
     * @returns {ApiError} 404 - Project not found - application/json
     */

    .delete(authenticateToken, controllerHandler(projectController.delete));

module.exports = router;
