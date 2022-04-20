const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(null, ''),
    date: Joi.date(),
    end_date: Joi.date(),
    status: Joi.string().pattern(/^Programmée|Annulée|Terminée$/),
    comments: Joi.string().allow(null, ''),
    report: Joi.string().allow(null, ''),
    project_id: Joi.number().integer().min(1),
    address_id: Joi.number().integer().min(1),
}).min(1).required();
