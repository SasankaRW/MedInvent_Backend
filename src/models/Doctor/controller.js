const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getAllDoctors = async (req, res) => {
  try {
    const result = await Service.getAllDoctors(req.query);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const createDoctor = async (req, res) => {
  try {
    const result = await Service.createDoctor(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getDoctorById = async (req, res) => {
  try {
    const result = await Service.getDoctorById(req.params.id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getDoctorByName = async (req, res) => {
  try {
    const result = await Service.getDoctorByName(req.params.name);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateDoctor = async (req, res) => {
  try {
    const result = await Service.updateDoctor(req.params.id, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const result = await Service.deleteDoctor(req.params.id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getAllDoctors,
  createDoctor,
  getDoctorById,
  getDoctorByName,
  updateDoctor,
  deleteDoctor,
};
