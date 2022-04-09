const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    date: Joi.date(),
    status: Joi.string().pattern(/^Programmée|Annulée|Terminée$/),
    comments: Joi.string(),
    report: Joi.string(),
    project_id: Joi.number().integer().min(1).required(),
    address_id: Joi.number().integer().min(1).required(),
}).required();
