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
    const result = await Service.updatePrescription(
      req.params.presid,
      req.body
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const assignPrescription = async (req, res) => {
  try {
    const result = await Service.assignPrescription(
      req.params.presid,
      req.body
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const addDailyMedications = async (req, res) => {
  try {
    const result = await Service.addDailyMedications(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getDailyMedications = async (req, res) => {
  try {
    const result = await Service.getDailyMedications(req.params.userid);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const markAsTaken = async (req, res) => {
  try {
    const result = await Service.markAsTaken(
      req.params.medicationId,
      req.body.currentStatus
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getDoctorPrescriptions,
  getUserPrescriptions,
  updatePrescription,
  assignPrescription,

  addDailyMedications,
  getDailyMedications,
  markAsTaken,
};
