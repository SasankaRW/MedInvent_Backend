const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getAllVisitingDoctors = async (req, res) => {
  try {
    const result = await Service.getAllVisitingDoctors(req.params.clinic_id);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getAllVisitingClinics = async (req, res) => {
  try {
    const result = await Service.getAllVisitingClinics(req.params.doctor_id);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getPendingDoctors = async (req, res) => {
  try {
    const result = await Service.getPendingDoctors(req.params.clinic_id);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getPendingClinics = async (req, res) => {
  try {
    const result = await Service.getPendingClinics(req.params.doctor_id);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const createVisiting = async (req, res) => {
  try {
    const result = await Service.createVisiting(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateVisiting = async (req, res) => {
  try {
    const result = await Service.updateVisiting(req.query, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteVisiting = async (req, res) => {
  try {
    const result = await Service.deleteVisiting(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getAllVisitingDoctors,
  getAllVisitingClinics,
  getPendingDoctors,
  getPendingClinics,
  createVisiting,
  updateVisiting,
  deleteVisiting,
};
