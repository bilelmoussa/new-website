import Joi from '@hapi/joi';

const sessionSchema = Joi.object({
  userId: Joi.string().trim().id().required(),
  sessionId: Joi.string().trim().id().required(),
  refreshToken: Joi.string().trim().required(),
  accessToken: Joi.string().trim().required(),
  userHash: Joi.string().alphanum().trim().required(),
  userRole: Joi.number().allow(0, 1).only().required(),
  logs: Joi.array().items(Joi.date().iso()).required(),
  createdOn: Joi.date().iso().min(new Date(2020, 0, 1, 0, 0, 0, 0)).required(),
  modifiedOn: Joi.date().iso().min(new Date(2020, 0, 1, 0, 0, 0, 0)).required(),
});

export default sessionSchema;
