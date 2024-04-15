const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");
//const { request } = require("../..");

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

const getSessionsDetailsByDocID = async (req, res) => {
  try {
    const result = await Service.getSessionsDetailsByDocID(req.params.doctor_id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
}; 

const getDependMemberDetailsByID = async (req,res)=> {
  try {
    const result = await Service.getDependMemberDetailsByID(req.params.userID,req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  }
  catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
}

const createDependMemberData = async (req, res) => {
  try {
    const result = await Service.createDependMemberData(req.params.userID,req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateDependMemberDetailsByID = async (req, res) => {
  try {
    const result = await Service.updateDependMemberDetailsByID(req.params.userID, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteDependMemberDetailsByID = async (req, res) => {
  try {
    const result = await Service.deleteDependMemberDetailsByID(req.params.userID,req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getSessionsDetailsByDocID,

  getDependMemberDetailsByID,

  getAllPatientUsersDetails,

  createDependMemberData,

  updateDependMemberDetailsByID,

  deleteDependMemberDetailsByID,
};
