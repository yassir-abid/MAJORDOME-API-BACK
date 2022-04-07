const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: '1.0.0',
        title: 'MAJORDOME PROJECT',
        description: 'Projet Majordome - API BACK',
    },
    baseDir: __dirname,
    filesPattern: ['../routers/**/*.js', '../errors/*.js', '../models/*.js'],
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    exposeApiDocs: true,
    apiDocsPath: '/api/docs',
    security: {
        BearerAuth: {
            type: 'http',
            scheme: 'bearer',
        },
    },
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);
