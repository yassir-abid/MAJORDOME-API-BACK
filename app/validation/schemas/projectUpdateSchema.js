const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(null, ''),
    comments: Joi.string().allow(null, ''),
    client_id: Joi.string(),
}).min(1).required();
