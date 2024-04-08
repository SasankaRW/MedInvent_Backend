const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const createSchema = Joi.object({
  name: Joi.string().required(),
  contactNo: Joi.string().required(),
  openHoursFrom: Joi.string().required(),
  openHoursTo: Joi.string().required(),
  openDays: Joi.array().items(Joi.string()).required(),
  email: Joi.string().email().required(),
  pharmacyAddress: Joi.object({
    lineOne: Joi.string().required(),
    lineTwo: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
  }).required(),
  pharmacyLocation: Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }).required(),
});

const create = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
};
