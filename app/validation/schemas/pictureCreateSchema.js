const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().pattern(/^Avant|Après$/).required(),
    path: Joi.string().required(),
}).required();
