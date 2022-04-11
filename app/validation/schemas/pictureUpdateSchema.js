const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string(),
    status: Joi.string().pattern(/^Avant|Après$/),
    path: Joi.string(),
}).required();
