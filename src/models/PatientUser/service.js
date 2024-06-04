const Constants = require("./constants");

const DataBase = require("./database");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const { to, TE } = require("../../helper");

const getAllPatientUsersDetails = async (params) => {
  Object.assign(params);

  const getRecodes = DataBase.findByQuery();

  const [err, result] = await to(getRecodes);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPatientUserDetailsByID = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPatientUserDetailsByNic = async (filter) => {
  const getRecode = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) return { success: false, message: "Patient not found" };

  return result;
};

const createPatientUserData = async (data) => {
  const createSingleRecode = DataBase.createSingleRecode(data);

  const [err, result] = await to(createSingleRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const updatePatientUserDetailsByID = async (filter, updateData) => {
  const updateRecode = DataBase.updateRecode({ where: filter }, updateData);

  const [err, result] = await to(updateRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const patientData = await DataBase.findOneByQuery({ where: filter });

  return patientData;
};

const deletePatientUserDetailsByID = async (data) => {
  const deleteRecode = DataBase.deleteSingleRecode(data);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getAllPatientUsersDetails,

  getPatientUserDetailsByID,

  getPatientUserDetailsByNic,

  createPatientUserData,

  updatePatientUserDetailsByID,

  deletePatientUserDetailsByID,
};
