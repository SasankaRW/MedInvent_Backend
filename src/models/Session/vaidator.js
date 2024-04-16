
const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
//const Constants = require("../metadata/constants");
//const locations = Constants.locations; 


const createSchema = Joi.object({
  session_id: Joi.string().uuid().optional(),
  doctor_id: Joi.string().uuid().optional(),
  clinic_id: Joi.string().uuid().optional(),
  scheduledBy: Joi.string().required(),
  noOfPatients:Joi.number().integer().required(),
  activePatient:Joi.number().integer().optional(),
  isRefundable:Joi.boolean().optional(),
  isArrived:Joi.boolean().optional(),
  date:Joi.date().required(),
  isCancelled:Joi.boolean().optional(),
  cancelledBy:Joi.string().uuid().optional(),
});

const updateSchema = Joi.object({
  session_id: Joi.string().uuid().optional(),
  doctor_id: Joi.string().uuid().optional(),
  clinic_id: Joi.string().uuid().optional(),
  scheduledBy: Joi.string().optional(),
  noOfPatients:Joi.number().integer().optional(),
  activePatient:Joi.number().integer().optional(),
  isRefundable:Joi.boolean().optional(),
  isArrived:Joi.boolean().optional(),
  date:Joi.date().optional(),
  isCancelled:Joi.boolean().optional(),
  cancelledBy:Joi.string().uuid().optional(),
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
