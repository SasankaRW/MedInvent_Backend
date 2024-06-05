const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const createSchema = Joi.object({
  doctor_id: Joi.string().guid({ version: "uuidv4" }).required(),
  clinic_id: Joi.string().guid({ version: "uuidv4" }).required(),
  scheduledById: Joi.string().guid({ version: "uuidv4" }).required(),
  scheduledByType: Joi.string().valid("doctor", "clinic").required(),
  dates: Joi.array().items(Joi.date()).required(),
  timeFrom: Joi.string()
    .pattern(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/)
    .required(),
  timeTo: Joi.string()
    .pattern(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/)
    .required(),
  noOfPatients: Joi.number().integer().required(),
  activePatients: Joi.number().integer().optional(),
  isRefundable: Joi.boolean().optional(),
});

const updateSchema = Joi.object({
  noOfPatients: Joi.number().integer().optional(),
  isArrived: Joi.boolean().optional(),
  timeFrom: Joi.string()
    .pattern(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/)
    .optional(),
  timeTo: Joi.string()
    .pattern(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/)
    .optional(),
  isCancelled: Joi.boolean().optional(),
  cancelledBy: Joi.string()
    .uuid()
    .when("isCancelled", { is: true, then: Joi.required() }),
  cancelledByType: Joi.string()
    .valid("doctor", "clinic")
    .when("isCancelled", { is: true, then: Joi.required() }),
}).with("cancelledBy", "cancelledByType");

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
