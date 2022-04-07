/**
 * Middleware using sanitizer package to protect against XSS flaws
 * by escaping HTML special characters
 */

const debug = require('debug')('Cleaner');

const sanitizer = require('sanitizer');

const sanitize = (obj) => {
    Object.keys(obj).forEach((prop) => {
        obj[prop] = sanitizer.escape(obj[prop]);
    });
};

const cleaner = (request, response, next) => {
    debug(request.url);
    if (request.url.includes('/api/clients')) {
        sanitize(request.params);
        sanitize(request.query);
        if (request.body) {
            if (request.body.client) {
                sanitize(request.body.client);
            }
            if (request.body.addresses) {
                request.body.addresses.forEach((address) => sanitize(address));
            }
        }
        next();
    } else {
        sanitize(request.params);
        sanitize(request.query);
        if (request.body) {
            sanitize(request.body);
        }
        next();
    }
};

// const cleanerClient = (request, response, next) => {
//     debug(request.url);
//     sanitize(request.params);
//     sanitize(request.query);
//     if (request.body) {
//         if (request.body.client) {
//             sanitize(request.body.client);
//         }
//         if (request.body.addresses) {
//             request.body.addresses.forEach((address) => sanitize(address));
//         }
//     }
//     next();
// };

module.exports = cleaner;
