const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const reminderSchema = Joi.string()
  .pattern(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/)
  .required();

const presMedicineSchema = Joi.object({
  name: Joi.string().required(),
  qty: Joi.number().integer().min(1).required(),
  frq: Joi.string()
    .valid(
      "Once Daily",
      "Twice Daily",
      "3 Times Daily",
      "4 Times Daily",
      "Every 4 Hours",
      "Every 6 Hours",
      "Every 8 Hours",
      "Every 12 Hours",
      "Once Weekly",
      "Twice Weekly",
      "Every Other Day",
      "At Bedtime",
      "As Needed"
    )
    .required(),
  mealTiming: Joi.string().valid("Before", "After", "With").required(),
  duration: Joi.number().integer().min(1).required(),
  reminders: Joi.array().items(reminderSchema).optional(),
});

const prescriptionSchema = Joi.object({
  presName: Joi.string().required(),
  createdBy: Joi.string().valid("doctor", "user").required(),
  doctorName: Joi.string().when("createdBy", {
    is: "doctor",
    then: Joi.string().required(),
  }),
  presMedicine: Joi.array().items(presMedicineSchema).required(),
});

const updateSchema = Joi.object({
  medicineId: Joi.string().guid({ version: "uuidv4" }).required(),
  reminders: Joi.array().items(reminderSchema).required(),
});

const assignedSchema = Joi.object({
  assignedTo: Joi.alternatives()
    .try(Joi.string().valid("user"), Joi.string().guid({ version: ["uuidv4"] }))
    .required(),
});

const create = async (req, res, next) => {
  try {
    await prescriptionSchema.validateAsync(req.body.data);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const update = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body.data);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const assign = async (req, res, next) => {
  try {
    await assignedSchema.validateAsync(req.body.data);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
  update,
  assign,
};
