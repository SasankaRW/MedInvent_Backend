const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
//const Constants = require("../metadata/constants");
//const locations = Constants.locations; 


const createSchema = Joi.object({
  userID: Joi.string().uuid().required(),
  mobileNo: Joi.number().integer().required(),
  lineOne: Joi.string().max(50).allow(null, ''),
  lineTwo: Joi.string().max(50).allow(null, ''),
  city: Joi.string().max(25).allow(null, ''),
  postalCode: Joi.string().max(10).allow(null, ''),
  district: Joi.string().max(30).allow(null, ''),
  Fname: Joi.string().max(50).required(),
  Lname: Joi.string().max(50).required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  email: Joi.string().email().required(),
  nic: Joi.string().max(40).required(),
  dob: Joi.date().required(),
  picPath: Joi.string().max(255).required(),
  createTime: Joi.date().default(Date.now())
});

// const updateSchema = Joi.object({
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

const create = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

// const update = async (req, res, next) => {
//   try {
//     await updateSchema.validateAsync(req.body);
//     next();
//   } catch (error) {
//     VALIDATION_ERROR(res, error);
//   }
// };

module.exports = {
  create,
  //update,
};
