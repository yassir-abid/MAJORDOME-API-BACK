const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    comments: Joi.string(),
    client_id: Joi.string(),
}).min(1).required();
