const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    date: Joi.date().required(),
    end_date: Joi.date().required(),
    status: Joi.string().pattern(/^Programmée|Annulée|Terminée$/).required(),
    comments: Joi.string().allow(null, '').optional(),
    report: Joi.string().allow(null, '').optional(),
    project_id: Joi.number().integer().min(1).required(),
    address_id: Joi.number().integer().min(1).required(),
}).required();
