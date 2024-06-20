const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
//const Constants = require("../metadata/constants");
//const locations = Constants.locations;

const createSchema = Joi.object({
  Fname: Joi.string().required(),
  Lname: Joi.string().required(),
  dob: Joi.date().required(),
  relationship: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female").max(10).required(),
  picPath: Joi.string().max(255).optional().allow(null, ""),
  nic: Joi.string().required(),
  userID: Joi.string().uuid().required(),
});

const updateSchema = Joi.object({
  dID: Joi.string().uuid().required(),
  Fname: Joi.string().max(50).optional(),
  Lname: Joi.string().max(50).optional(),
  dob: Joi.date().optional(),
  relationship: Joi.string().max(25).optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  picPath: Joi.string().max(255).optional(),
  nic: Joi.string().max(40).optional(),
  userID: Joi.string().uuid().optional(),
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
