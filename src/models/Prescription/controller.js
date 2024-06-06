const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const createPrescription = async (req, res) => {
  try {
    const result = await Service.createPrescription(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const result = await Service.getAllPrescriptions(req.params.userid);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getDoctorPrescriptions = async (req, res) => {
  try {
    const result = await Service.getDoctorPrescriptions(req.params.userid);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getUserPrescriptions = async (req, res) => {
  try {
    const result = await Service.getUserPrescriptions(req.params.userid);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const updatePrescription = async (req, res) => {
  try {
    const result = await Service.updatePrescription(req.params.presid, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

// const deleteDoctor = async (req, res) => {
//   try {
//     const result = await Service.deleteDoctor(req.params.id);

//     SUCCESS(res, SUC_CODES, result, req.span);
//   } catch (error) {
//     console.log(error);

//     ERROR(res, error, res.span);
//   }
// };

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getDoctorPrescriptions,
  getUserPrescriptions,
  updatePrescription,
};