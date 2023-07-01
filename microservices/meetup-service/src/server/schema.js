import Joi from 'joi';

export const bodyParams = Joi.object().keys({
  title: Joi.string().allow('').max(60).required().label('Title'),
  description: Joi.string().allow('').max(600).required().label('Description'),
  tags: Joi.array().items(Joi.string().max(30)).required().label('Tags'),
  time: Joi.date().greater('now').iso().required().label('Date'),
});

export const idParam = Joi.number().required().label('Id');

export const queryParams = Joi.object().keys({
  title: Joi.string().max(60).label('Title'),
  description: Joi.string().max(30).label('Description'),
  order: Joi.string().valid('DESC', 'ASC').label('Order (ASC or DESC)'),
  orderBy: Joi.string()
    .valid('title', 'description', 'id', 'time')
    .label('The base field to order (orderBy)'),
  limit: Joi.string().regex(/^\d+$/).label('Page limit (limit)'),
  page: Joi.string().regex(/^\d+$/).label('Page number (page)'),
});
