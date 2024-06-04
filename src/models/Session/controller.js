const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");
//const { request } = require("../.."); 
  
const { SUC_CODES } = require("./constants").Codes;

//Create Sessions Doctor

const createSessionData = async (req, res) => {
  try {
    
    const result = await Service.createSessionData(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};


//Filter Session Details
//By DoctorID
const getSessionsDetailsByDocID = async (req, res) => {
  try {
    const result = await Service.getSessionsDetailsByDocID(req.params.doctor_id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
}; 

//By Date
const getSessionDetailsByDate = async (req, res) => {
  try {
    const result = await Service.getSessionDetailsByDate(req.params.date);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

//By SessionID
const getSessionDetailsByID = async (req,res)=> {
  try {
    const result = await Service.getSessionDetailsByID(req.params.session_id);

    SUCCESS(res, SUC_CODES, result, req.span);
  }
  catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
}

// const createDependMemberData = async (req, res) => {
//   try {
//     const result = await Service.createDependMemberData(req.params.userID,req.body);

//     SUCCESS(res, SUC_CODES, result, req.span);
//   } catch (error) {
//     console.log(error);

//     ERROR(res, error, res.span);
//   }
// };

const updateCancelSessionByID = async (req, res) => {
  try {
    const result = await Service.updateCancelSessionByID(req.params.session_id, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};


// const deleteDependMemberDetailsByID = async (req, res) => {
//   try {
//     const result = await Service.deleteDependMemberDetailsByID(req.params.userID,req.body);

//     SUCCESS(res, SUC_CODES, result, req.span);
//   } catch (error) {
//     console.log(error);

//     ERROR(res, error, res.span);
//   }
// };

module.exports = {
  createSessionData,

  getSessionsDetailsByDocID,

  getSessionDetailsByDate,

  getSessionDetailsByID,



  updateCancelSessionByID,


};
