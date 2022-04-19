const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
    end_date: Joi.date(),
    status: Joi.string().pattern(/^Programmée|Annulée|Terminée$/),
    comments: Joi.string(),
    report: Joi.string(),
    project_id: Joi.number().integer().min(1),
    address_id: Joi.number().integer().min(1),
}).min(1).required();
