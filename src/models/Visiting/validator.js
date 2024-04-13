const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const visitingSchema = Joi.object({
  docFee: Joi.number().precision(2).allow(null),
  isReqAccepted: Joi.boolean().default(false),
  clinic_id: Joi.string().guid({ version: "uuidv4" }).required(),
  doctor_id: Joi.string().guid({ version: "uuidv4" }).required(),
});

const visitingUpdateSchema = Joi.object({
  docFee: Joi.number().precision(2),
  isReqAccepted: Joi.boolean(),
}).min(1);

const create = async (req, res, next) => {
  try {
    await visitingSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const update = async (req, res, next) => {
  try {
    await visitingUpdateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
  update,
};
