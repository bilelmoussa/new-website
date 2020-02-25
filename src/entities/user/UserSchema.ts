import Joi from '@hapi/joi';

const userSchema = Joi.object({
  _id: Joi.string().id().required(),
  fullName: Joi.object({
    firstName: Joi.string()
        .lowercase()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .lowercase()
        .trim()
        .alphanum()
        .min(1)
        .max(30)
        .required(),
  }),
  email: Joi.string()
      .trim()
      .email()
      .required(),
  role: Joi.number()
      .allow(0, 1)
      .only()
      .required(),
  password: Joi.string().alphanum().min(8).max(30).required(),
  repeatPassword: Joi.ref('password'),
  createdOn: Joi.date().iso()
      .min(new Date(2020, 0, 1, 0, 0, 0, 0)).required(),
  modifiedOn: Joi.date().iso().min(new Date(2020, 0, 1, 0, 0, 0, 0)).required(),
});

export default userSchema;
