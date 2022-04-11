const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    comments: Joi.string().optional(),
    client_id: Joi.string().required(),
});
