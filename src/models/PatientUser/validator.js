const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const createSchema = Joi.object({
  userDetails: Joi.object({
    Fname: Joi.string().max(50).required(),
    Lname: Joi.string().max(50).required(),
    mobileNo: Joi.string().max(12).required(),
    email: Joi.string().email().required(),
    nic: Joi.string().max(40).required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    dob: Joi.date().required(),
    picPath: Joi.string().optional().allow(null, ""),
    patientAddress: Joi.object({
      lineOne: Joi.string().max(50).required(),
      lineTwo: Joi.string().max(50).optional().allow(null, ""),
      city: Joi.string().max(25).required(),
      postalCode: Joi.string().max(10).optional().allow(null, ""),
      district: Joi.string().required(),
    }).required(),
  }),
  credentials: Joi.object({
    mobileNo: Joi.string().max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateSchema = Joi.object({
  Fname: Joi.string().max(50).optional(),
  Lname: Joi.string().max(50).optional(),
  mobileNo: Joi.string().max(12).optional(),
  email: Joi.string().email().optional(),
  nic: Joi.string().max(40).optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  dob: Joi.date().optional(),
  picPath: Joi.string().optional(),
  patientAddress: Joi.object({
    lineOne: Joi.string().max(50).optional(),
    lineTwo: Joi.string().max(50).optional(),
    city: Joi.string().max(25).optional(),
    postalCode: Joi.string().max(10).optional(),
    district: Joi.string().optional(),
  }).optional(),
  password: Joi.string().optional(),
});

const create = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const update = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
  update,
};
