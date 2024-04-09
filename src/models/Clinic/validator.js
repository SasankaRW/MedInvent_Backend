const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const dataSchema = Joi.object({
  name: Joi.string().required(),
  contactNo: Joi.string().required(),
  openHoursFrom: Joi.string().required(),
  openHoursTo: Joi.string().required(),
  openDays: Joi.array().items(Joi.string()).required(),
  email: Joi.string().email().required(),
  clinicAddress: Joi.object({
    lineOne: Joi.string().required(),
    lineTwo: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
  }).required(),
  clinicLocation: Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }).required(),
});

const credentialsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

const clinicDataSchema = Joi.object({
  data: dataSchema,
  credentials: credentialsSchema,
}).required();

const create = async (req, res, next) => {
  try {
    await clinicDataSchema.validateAsync(req.body);
    await credentialsSchema.validateAsync(req.body.credentials);
    await dataSchema.validateAsync(req.body.data);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
};
