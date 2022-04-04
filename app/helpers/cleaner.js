/**
 * Middleware using sanitizer package to protect against XSS flaws
 * by escaping HTML special characters
 */

const sanitizer = require('sanitizer');

const sanitize = (obj) => {
    Object.keys(obj).forEach((prop) => {
        obj[prop] = sanitizer.escape(obj[prop]);
    });
};

const cleaner = (request, response, next) => {
    sanitize(request.params);
    sanitize(request.query);
    if (request.body) {
        sanitize(request.body);
    }
    next();
};

module.exports = cleaner;
