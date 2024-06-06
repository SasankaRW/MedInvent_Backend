const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const createSchema = Joi.object({
  user_id: Joi.string().guid({ version: "uuidv4" }).optional(),
  patientTitle: Joi.string().required(),
  patientName: Joi.string().required(),
  contactNo: Joi.string()
    .pattern(/^07\d{8}$/)
    .required(),
  email: Joi.string().email().optional(),
  area: Joi.string().required(),
  nic: Joi.string().required(),
  session_id: Joi.string().guid({ version: "uuidv4" }).required(),
});

const updateSchema = Joi.object({
  cancelledByType: Joi.string().valid("user", "clinic").required(),
  cancelledById: Joi.string().guid({ version: "uuidv4" }).required(),
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
