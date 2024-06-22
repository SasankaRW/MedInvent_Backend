const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const dataSchema = Joi.object({
  fname: Joi.string().required(),
  mname: Joi.string().allow("", null),
  lname: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().required(),
  nic: Joi.string().required(),
  contactNo: Joi.string().required(),
  dob: Joi.date().required(),
  medical_license_no: Joi.string().required(),
  specialization: Joi.string().required(),
  note: Joi.string().allow("", null),
});

const updateDataSchema = Joi.object({
  fname: Joi.string(),
  mname: Joi.string(),
  lname: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string(),
  nic: Joi.string(),
  contactNo: Joi.string(),
  dob: Joi.date(),
  medical_license_no: Joi.string(),
  specialization: Joi.string(),
  note: Joi.string().allow(null, ""),
});

const credentialsSchema = Joi.object({
  email: Joi.string().email().required(),
  mobileNo: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const doctorDataSchema = Joi.object({
  data: dataSchema,
  credentials: credentialsSchema,
}).required();

const create = async (req, res, next) => {
  try {
    await doctorDataSchema.validateAsync(req.body);
    await credentialsSchema.validateAsync(req.body.credentials);
    await dataSchema.validateAsync(req.body.data);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const update = async (req, res, next) => {
  try {
    await updateDataSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
  update,
};
