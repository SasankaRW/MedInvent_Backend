const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
//const Constants = require("../metadata/constants");
//const locations = Constants.locations; 


const createSchema = Joi.object({
  //appointment_id: Joi.string().uuid().required(),
  appointmentNo: Joi.number().integer().required(),
  patientTitle: Joi.string().max(10).allow(null,''),
  patientName: Joi.string().max(50).allow(null, ''),
  contactNo: Joi.string().max(25).allow(null, ''),
  email: Joi.string().max(50).allow(null, ''),
  area: Joi.string().max(30).allow(null, ''),
  nic: Joi.string().max(50).required() 
 
});

// const updateSchemas = Joi.object({
//   restaurantName: Joi.string().optional(),
//   contactNumber: Joi.string().optional(),
//   registrationDate: Joi.date().optional().allow(null),
//   registrationNo: Joi.string().optional(),
//   address: Joi.string().optional().allow(null, ""),
//   phiArea: Joi.string()
//     .optional()
//     .valid(...locations),
//   active: Joi.bool().optional(),
// });

const updateSchema = Joi.object({
 // userID: Joi.string().guid({ version: 'uuidv4' }).optional(),
  //appointment_id: Joi.string().uuid().required(),
  appointmentNo: Joi.number().integer().optional(),
  patientTitle: Joi.string().max(10).allow(null,''),
  patientName: Joi.string().max(50).allow(null, ''),
  contactNo: Joi.string().max(25).allow(null, ''),
  email: Joi.string().max(10).allow(null, ''),
  area: Joi.string().max(30).allow(null, ''),
  nic: Joi.string().max(50).optional() 

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
