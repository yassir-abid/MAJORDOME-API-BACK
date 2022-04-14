/* eslint-disable max-len */
const debug = require('debug')('PictureController');

const interventionDataMapper = require('../../models/intervention');
const pictureDataMapper = require('../../models/picture');

const { ApiError } = require('../../helpers/errorHandler');

const baseUrl = process.env.BASE_FILE_URL;

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
        const intervention = await interventionDataMapper.findByPk(request.params.interventionId, request.decoded.id);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        const pictures = await pictureDataMapper.findAll(request.params.interventionId);

        pictures.forEach((picture) => {
            let url;
            if (!picture.path || picture.path === '') {
                url = null;
            } else {
                url = `${baseUrl}picture/${picture.path}`;
            }
            picture.path = url;
        });

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

        const picture = await pictureDataMapper.findByPk(request.params.pictureId, request.decoded.id);

        if (!picture) {
            throw new ApiError('Picture not found', { statusCode: 404 });
        }

        let url;
        if (!picture.path || picture.path === '') {
            url = null;
        } else {
            url = `${baseUrl}picture/${picture.path}`;
        }
        picture.path = url;

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
        const intervention = await interventionDataMapper.findByPk(request.params.interventionId, request.decoded.id);

        if (!intervention) {
            throw new ApiError('Intervention not found', { statusCode: 404 });
        }

        if (request.body.status !== 'Avant' && request.body.status !== 'Après') {
            throw new ApiError(`"status" with value "${request.body.status}" fails to match the required pattern: /^Avant|Après$/`, { statusCode: 400 });
        }

        request.body.path = request.file.customName;

        const savedPicture = await pictureDataMapper.insert(request.body, request.params.interventionId);

        if (!savedPicture.path || savedPicture.path === '') {
            savedPicture.path = null;
        } else {
            savedPicture.path = `${baseUrl}picture/${savedPicture.path}`;
        }

        response.json(savedPicture);
    },

    /**
     * Intervention controller to update a picture
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Picture} Route API JSON response
     */
    async updateDetails(request, response) {
        debug('updateDetails');

        const picture = await pictureDataMapper.findByPk(request.params.pictureId, request.decoded.id);

        if (!picture) {
            throw new ApiError('Picture not found', { statusCode: 404 });
        }

        const savedPicture = await pictureDataMapper.update(request.params.pictureId, request.body);

        if (!savedPicture.path || savedPicture.path === '') {
            savedPicture.path = null;
        } else {
            savedPicture.path = `${baseUrl}picture/${savedPicture.path}`;
        }

        return response.json(savedPicture);
    },

    /**
     * Intervention controller to upload new picture file
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Picture} Route API JSON response
     */
    async updateFile(request, response) {
        debug('updatePicture');

        const picture = await pictureDataMapper.findByPk(request.params.pictureId, request.decoded.id);

        if (!picture) {
            throw new ApiError('Picture not found', { statusCode: 404 });
        }

        request.body.path = request.file.customName;

        const savedPicture = await pictureDataMapper.update(request.params.pictureId, request.body);

        if (!savedPicture.path || savedPicture.path === '') {
            savedPicture.path = null;
        } else {
            savedPicture.path = `${baseUrl}picture/${savedPicture.path}`;
        }

        return response.json(savedPicture);
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

        const picture = await pictureDataMapper.findByPk(request.params.pictureId, request.decoded.id);

        if (!picture) {
            throw new ApiError('Picture not found', { statusCode: 404 });
        }

        await pictureDataMapper.delete(request.params.pictureId);
        return response.status(204).json();
    },
};

module.exports = pictureController;
