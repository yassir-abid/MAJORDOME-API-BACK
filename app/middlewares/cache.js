/**
 * Module that uses Redis for caching
 */

const debug = require('debug')('CacheModule');
const { createClient } = require('redis');

const db = createClient();

const TTL = 60 * 30;
const PREFIX = 'majordome:';

// storage of the different keys inserted in redis
const keys = [];

const cacheModule = {
    /**
     * method to connect redis client
     */
    async connect() {
        await db.connect();
    },

    /**
     * middleware that caches data and calls the following middleware
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object (not used)
     * @param {object} next Express next object
     * @returns {object} Route API JSON response
     */
    async cache(request, response, next) {
        const key = `${PREFIX}${request.url}`;

        // When data is cached
        if (keys.includes(key)) {
            debug('Data via Redis');
            // retrieve data
            const cachedString = await db.get(key);
            // convert data
            const cachedValue = JSON.parse(cachedString);
            // send data
            return response.json(cachedValue);
        }

        // When data is not cached
        // save the original code of response.json
        const originalJson = response.json.bind(response);
        // include data caching before calling the original code response.json
        response.json = async (data) => {
            debug('Caching with custom Json Response');
            const jsonData = JSON.stringify(data);
            await db.setEx(key, TTL, jsonData);
            keys.push(key);
            originalJson(data);
        };

        return next();
    },

    /**
     * middleware to flush the cache
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object (not used)
     * @param {object} next Express next object
     */
    async flush(request, response, next) {
        debug('Flush the cache');

        const promises = [];
        keys.forEach((key) => promises.push(db.del(key)));
        await Promise.all(promises);

        // clean redis keys array
        keys.length = 0;

        next();
    },
};

module.exports = cacheModule;
