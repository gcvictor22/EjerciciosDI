import * as Joi from 'joi';

export const CreateUserSchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
  address: Joi.string(),
  age: Joi.number().min(10).max(80).required(),
});
