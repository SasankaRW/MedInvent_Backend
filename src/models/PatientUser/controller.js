const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getAllPatientUsersDetails = async (req, res) => {
  try {
    const result = await Service.getAllPatientUsersDetails(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPatientUserDetailsByID = async (req, res) => {
  try {
    const result = await Service.getPatientUserDetailsByID(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPatientUserDetailsByNic = async (req, res) => {
  try {
    const result = await Service.getPatientUserDetailsByNic(req.params);

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

const createPatientUserData = async (req, res) => {
  try {
    const result = await Service.createPatientUserData(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updatePatientUserDetailsByID = async (req, res) => {
  try {
    const result = await Service.updatePatientUserDetailsByID(
      req.params,
      req.body
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deletePatientUserDetailsByID = async (req, res) => {
  try {
    const result = await Service.deletePatientUserDetailsByID(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getAllPatientUsersDetails,
  getPatientUserDetailsByID,
  getPatientUserDetailsByNic,
  createPatientUserData,
  updatePatientUserDetailsByID,
  deletePatientUserDetailsByID,
  checkEmailAndMobileNo,
  checkEmailAndNic,
  checkNic,
};
