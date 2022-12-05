const Joi = require('joi')

module.exports = {
  data: Joi.object().keys({
    title: Joi.string().allow('').max(60).required().label('Title'),
    description: Joi.string()
      .allow('')
      .max(600)
      .required()
      .label('Description'),
    tags: Joi.array().items(Joi.string().max(30)).required().label('Tags'),
    time: Joi.date().greater('now').iso().required().label('Date'),
  }),
  id: Joi.number().required().label('Id'),
}
