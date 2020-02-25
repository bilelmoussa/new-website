import Joi from '@hapi/joi';

const loginSchema = Joi.object({
  password: Joi.string().alphanum().min(8).max(30).required(),
  email: Joi.string().trim().email().required(),
});

export default loginSchema;
