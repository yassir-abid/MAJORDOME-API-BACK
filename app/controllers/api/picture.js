/* eslint-disable max-len */
const debug = require('debug')('PictureController');

const interventionDataMapper = require('../../models/intervention');
const pictureDataMapper = require('../../models/picture');

const { ApiError } = require('../../helpers/errorHandler');

const pictureController = {
    /**
     * Intervention controller to get intervention pictures by intervention id
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {array<Picture>} Route API JSON response
     */
    async getAll(request, response) {
        debug('getAll');
        const intervention = await interventionDataMapper.findByPk(request.params.interventionId);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const pictures = await pictureDataMapper.findAll(request.params.interventionId);

        return response.json(pictures);
    },

    /**
     * Intervention controller to get intervention pictures by intervention id
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {array<Picture>} Route API JSON response
     */
    async getOne(request, response) {
        debug('getOne');
        const intervention = await interventionDataMapper.findByPk(request.params.interventionId);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const picture = await pictureDataMapper.findByPk(request.params.pictureId);

        if (!picture) {
            throw new ApiError('Picture not found', { statusCode: 404 });
        }

        return response.json(picture);
    },

    /**
     * Intervention controller to add a new picture
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Picture} Route API JSON response
     */
    async create(request, response) {
        debug('create');
        const intervention = await interventionDataMapper.findByPk(request.params.interventionId);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const savedPicture = await pictureDataMapper.insert(request.body, request.params.interventionId);
        response.json(savedPicture);
    },

    /**
     * Intervention controller to update a picture
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Picture} Route API JSON response
     */
    async update(request, response) {
        debug('update');
        const intervention = await interventionDataMapper.findByPk(request.params.interventionId);
        if (!intervention) {
            throw new ApiError('This intervention does not exists', { statusCode: 404 });
        }

        const picture = await pictureDataMapper.findByPk(request.params.pictureId);

        if (!picture) {
            throw new ApiError('Picture not found', { statusCode: 404 });
        }

        const savecPicture = await pictureDataMapper.update(request.params.pictureId, request.body);

        return response.json(savecPicture);
    },

    /**
     * Intervention controller to delete picture.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete(request, response) {
        debug('delete');
        const intervention = await interventionDataMapper.findByPk(request.params.interventionId);
        if (!intervention) {
            throw new ApiError('This intervention does not exists', { statusCode: 404 });
        }

        const picture = await pictureDataMapper.findByPk(request.params.pictureId);

        if (!picture) {
            throw new ApiError('Picture not found', { statusCode: 404 });
        }

        await pictureDataMapper.delete(request.params.pictureId);
        return response.status(204).json();
    },
};

module.exports = pictureController;
