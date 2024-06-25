const DataBase = require("./database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { to, TE } = require("../../helper");

const createPatientUser = async (data) => {
  const createSingleRecord = DataBase.createSingleRecord(data.data);

  const [err, result] = await to(createSingleRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const getAllPatientUsers = async (params) => {
  Object.assign(params);

  const getRecords = DataBase.findByQuery();

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPatientUserByID = async (filter) => {
  const getRecord = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPatientUserByNic = async (filter) => {
  const getRecord = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) return { success: false, message: "Patient not found" };

  return result;
};

const getPatientUserByEmail = async (filter) => {
  const getRecord = DataBase.findOneByQuery({
    where: filter,
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) return { success: false, message: "Patient not found" };

  return result;
};

const checkEmailAndMobileNo = async (email, mobileNo) => {
  const getRecord = DataBase.findOneByQuery({
    where: {
      [Op.or]: [{ email: email }, { mobileNo: mobileNo }],
    },
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) return { success: false, message: "Patient not found" };

  return result;
};

const checkNic = async (nic) => {
  const getRecord = DataBase.findOneByQuery({
    where: {
      nic: nic,
    },
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) return { success: false, message: "Patient not found" };

  return result;
};

const checkEmailAndNic = async (email, nic) => {
  const getRecord = DataBase.findOneByQuery({
    where: {
      [Op.and]: [{ email: email }, { nic: nic }],
    },
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result)
    return { success: false, message: "Email and NIC does not match" };

  return result;
};

const updatePatientUserByID = async (filter, updateData) => {
  const updateRecord = DataBase.updateRecord({ where: filter }, updateData);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  await DataBase.updateRecord_address({ where: filter }, updateData);

  const patientData = await DataBase.findOneByQuery({ where: filter });

  return patientData;
};

const deletePatientUserByID = async (data) => {
  const deleteRecord = DataBase.deleteSingleRecord(data);

  const [err, result] = await to(deleteRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
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
