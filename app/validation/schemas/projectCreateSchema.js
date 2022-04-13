const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    comments: Joi.string().allow(null, '').optional(),
    client_id: Joi.string().required(),
});
