const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    path: Joi.string().required(),
    client_id: Joi.number().integer().min(1),
    project_id: Joi.number().integer().min(1),
    intervention_id: Joi.number().integer().min(1),
    supplier_id: Joi.number().integer().min(1),
}).required();
