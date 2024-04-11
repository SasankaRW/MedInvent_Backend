const DataBase = require("./database");

const { to, TE } = require("../../helper");

const getAllClinics = async (params) => {
  const getRecords = DataBase.findByQuery();

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getClinicById = async (id) => {
  const getRecord = DataBase.findOneByQuery(id);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getClinicByName = async (name) => {
  const getRecord = DataBase.findByQuery(name);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getNearByClinics = async (params) => {
  const getRecords = DataBase.findByLocation(params);

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const createClinic = async (data) => {
  const createSingleRecord = DataBase.createSingleRecord(data);

  const [err, result] = await to(createSingleRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const updateClinic = async (id, updateData) => {
  const updateRecord = DataBase.updateRecord(
    {
      where: { clinic_id: id },
    },
    updateData
  );

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const clinic = await DataBase.findOneByQuery(id);

  return clinic;
};

const deleteClinic = async (id) => {
  const deleteRecord = DataBase.deleteSingleRecord(id);

  const [err, result] = await to(deleteRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getAllClinics,
  getClinicById,
  getClinicByName,
  getNearByClinics,
  createClinic,
  updateClinic,
  deleteClinic,
};
