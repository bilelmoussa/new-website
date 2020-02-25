import Joi from '@hapi/joi';

const tokenSchema = Joi.object({
  token: Joi.string().trim().required(),
});

export default tokenSchema;
