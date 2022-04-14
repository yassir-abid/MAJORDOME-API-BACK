/* eslint-disable max-len */
const debug = require('debug')('ClientController');

const clientDataMapper = require('../../models/client');
const addressDataMapper = require('../../models/address');

const { ApiError } = require('../../helpers/errorHandler');

const clientController = {
    /**
     * Client controller to get all clients and their addresses
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object
     * @returns {array<ClientWithAddress>} Route API JSON response
     */
    async getAll(request, response) {
        debug('getAll');
        const clients = await clientDataMapper.findAll();
        return response.json(clients);
    },

    /**
     * Client controller to get a one client and his addresses
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {ClientWithAddress} Route API JSON response
     */
    async getOne(request, response) {
        debug('getOne');
        const client = await clientDataMapper.findByPk(request.params.id);

        if (!client) {
            throw new ApiError('Client not found', { statusCode: 404 });
        }

        return response.json(client);
    },

    /**
     * Client controller to create a new client and his addresses
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {ClientWithAddress} Route API JSON response
     */
    async create(request, response) {
        debug('create');
        const clientInfos = request.body.client;
        const client = await clientDataMapper.isUnique(clientInfos);
        if (client) {
            throw new ApiError('Client with this email already exists', { statusCode: 409 });
        }
        clientInfos.provider_id = request.decoded.id;
        const savedClient = await clientDataMapper.insert(clientInfos);

        if (request.body.addresses.length === 0) {
            throw new ApiError('An address is required ', { statusCode: 409 });
        }
        const promises = [];
        request.body.addresses.forEach((address) => {
            address.client_id = savedClient.id;
            promises.push(addressDataMapper.insert(address));
        });
        const savedAddresses = await Promise.all(promises);

        savedClient.addresses = savedAddresses;

        return response.json({ client: savedClient });
    },

    /**
     * Client controller to update a client and his addresses, or create address if does not exists
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {ClientWithAddress} Route API JSON response
     */
    async update(request, response) {
        debug('update');
        const client = await clientDataMapper.findByPk(request.params.id);
        if (!client) {
            throw new ApiError('Client not found', { statusCode: 404 });
        }

        if (request.body.client) {
            if (request.body.client.email) {
                const existingClient = await clientDataMapper.isUnique(
                    request.body.client,
                    request.params.id,
                );
                if (existingClient) {
                    throw new ApiError('Client with this email already exists', { statusCode: 409 });
                }
            }
            await clientDataMapper.update(request.params.id, request.body.client);
        }

        if (request.body.addresses) {
            const promises = [];
            const addressId = [];
            request.body.addresses.forEach((address) => {
                const { id, ...addressInfos } = address;
                if (id === null) {
                    addressInfos.client_id = request.params.id;
                    promises.push(addressDataMapper.insert(addressInfos));
                } else {
                    addressId.push(id);
                    promises.push(addressDataMapper.update(id, addressInfos));
                }
            });

            const clientAddresses = await addressDataMapper.findByClient(request.params.id);
            addressId.forEach((id) => {
                const foundAddress = clientAddresses.find((clientAddress) => clientAddress.id === Number(id));
                if (!foundAddress) {
                    throw new ApiError('Address_id does not match with any client addresses', { statusCode: 409 });
                }
            });

            await Promise.all(promises);
        }

        const savedClient = await clientDataMapper.findByPk(request.params.id);

        return response.json(savedClient);
    },

    /**
     * Client controller to delete a client record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete(request, response) {
        debug('delete');
        const client = await clientDataMapper.findByPk(request.params.id);
        if (!client) {
            throw new ApiError('Client not found', { statusCode: 404 });
        }

        await clientDataMapper.delete(request.params.id);
        return response.status(204).json();
    },

    /**
     * Client controller to delete a client's address record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async deleteAddress(request, response) {
        debug('deleteAddress');
        const address = await addressDataMapper.findByPk(request.params.addressId);
        if (!address) {
            throw new ApiError('Address not found', { statusCode: 404 });
        }

        const clientAddresses = await addressDataMapper.findByClient(address.client_id);
        if (clientAddresses.length === 1) {
            throw new ApiError('This address can not be deleted because it is the only client address', { statusCode: 409 });
        }

        await addressDataMapper.delete(request.params.addressId);
        return response.status(204).json();
    },
};

module.exports = clientController;
