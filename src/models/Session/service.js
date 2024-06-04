const Constants = require("./constants");

const DataBase = require("./database");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const { to, TE } = require("../../helper");
//const Doctor = require("../Doctor");
//const Session = require("../Session");
//const SessionDates=require("../")
//const Clinic = require("../Clinic");

  //Create sessions
  const createSessionData = async (data) => {
    const createSingleRecode = DataBase.createSingleRecode(data);
  
    const [err, result] = await to(createSingleRecode);
  
    if (err) TE(err.errors[0] ? err.errors[0].message : err);
  
    if (!result) TE("Result not found");
  
    return result;
  };

const getAllPatientUsersDetails = async (params) => {

  Object.assign(params);

  const getRecodes = DataBase.findByQuery();

  const [err, result] = await to(getRecodes);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionsDetailsByDocID = async (filter) => {

  const getRecode = DataBase.findAllByQuery(filter);

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionDetailsByID = async (getSessionID) => {
  const getSessionRowObject = {
    where: {
      session_id:getSessionID,
    }
  }
  const createSingleRecode = DataBase.findOneByQuery(getSessionRowObject);

  const [err, result] = await to(createSingleRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const createDependMemberData = async (getID,createData) => {
  const DependcCreateObject ={...createData,userID: getID};
  const createSingleRecode = DataBase.createSingleRecode(DependcCreateObject);

  const [err, result] = await to(createSingleRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const updateCancelSessionByID = async (getSessionID, getReqBody) => {

  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 5 * 60 * 60 * 1000);

  const updateRecode = DataBase.updateRecode(
    { 
      where: {
        session_id:getSessionID,
        date: { [Op.gte]: currentDate },
        timeFrom: {
          [Op.gt]: futureDate
        }
      }
    },
    getReqBody
  );

  const [err, result] = await to(updateRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const getRecord = getSessionDetailsByID(getSessionID);

  return getRecord;
};   

const deleteDependMemberDetailsByID = async (getID,getReqBody) => {
  const{dID} = getReqBody;
  const deleteDataObject ={
    where:{
      userID:getID,
      dID:dID
    }
  }
  const deleteRecode = DataBase.deleteSingleRecode(deleteDataObject);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const deleteSessionDetailsByID = async (session_id) => {
  const deleteRecode = DataBase.deleteSingleRecode(session_id);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  createSessionData ,

  deleteSessionDetailsByID,
  
  getAllPatientUsersDetails,

  getSessionsDetailsByDocID,

  getSessionDetailsByID,

  createDependMemberData,

  updateCancelSessionByID,

  deleteDependMemberDetailsByID,
};
