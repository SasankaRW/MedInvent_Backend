const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getAllClinics = async (req, res) => {
  try {
    const result = await Service.getAllClinics(req.query);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const createClinic = async (req, res) => {
  try {
    const result = await Service.createClinic(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getClinicById = async (req, res) => {
  try {
    const result = await Service.getClinicById(req.params.id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getClinicByName = async (req, res) => {
  try {
    const result = await Service.getClinicByName(req.params.name);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getNearByClinics = async (req, res) => {
  try {
    const result = await Service.getNearByClinics(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateClinic = async (req, res) => {
  try {
    const result = await Service.updateClinic(req.params.id, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteClinic = async (req, res) => {
  try {
    const result = await Service.deleteClinic(req.params.id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getAllClinics,
  createClinic,
  getClinicById,
  getClinicByName,
  getNearByClinics,
  deleteClinic,
  updateClinic,
};
