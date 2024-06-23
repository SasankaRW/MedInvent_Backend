const Service = require("./service");
const { SUCCESS, ERROR } = require("../../helper");
const { SUC_CODES } = require("./constants").Codes;

const getAllPatientUsers = async (req, res) => {
  try {
    const result = await Service.getAllPatientUsers(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPatientUserByID = async (req, res) => {
  try {
    const result = await Service.getPatientUserByID(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPatientUserByNic = async (req, res) => {
  try {
    const result = await Service.getPatientUserByNic(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPatientUserByEmail = async (req, res) => {
  try {
    const result = await Service.getPatientUserByEmail(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const checkEmailAndMobileNo = async (req, res) => {
  try {
    const result = await Service.checkEmailAndMobileNo(
      req.query.email,
      req.query.mobileNo
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const checkNic = async (req, res) => {
  try {
    const result = await Service.checkNic(req.params.nic);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const checkEmailAndNic = async (req, res) => {
  try {
    const result = await Service.checkEmailAndNic(
      req.query.email,
      req.query.nic
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const createPatientUser = async (req, res) => {
  try {
    const result = await Service.createPatientUser(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updatePatientUserByID = async (req, res) => {
  try {
    const result = await Service.updatePatientUserByID(req.params, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deletePatientUserByID = async (req, res) => {
  try {
    const result = await Service.deletePatientUserByID(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getAllPatientUsers,
  getPatientUserByID,
  getPatientUserByNic,
  getPatientUserByEmail,
  createPatientUser,
  updatePatientUserByID,
  deletePatientUserByID,
  checkEmailAndMobileNo,
  checkEmailAndNic,
  checkNic,
};
