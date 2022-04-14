const Joi = require('joi');

module.exports = Joi.object({
    token: Joi.string().required(),
    create_date: Joi.date(),
    expire_date: Joi.date(),
    provider_id: Joi.number().integer().min(1).required(),
}).required();
