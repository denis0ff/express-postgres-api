import Joi from 'joi';

export const userBodyParams = Joi.object().keys({
  username: Joi.string().required().max(32).label('Username'),
  password: Joi.string().required().max(64).label('Password'),
});
