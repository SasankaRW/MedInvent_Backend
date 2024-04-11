const DataBase = require("./database");

const { to, TE } = require("../../helper");

const getAllPharmacies = async (params) => {
  const getRecords = DataBase.findAll();

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getPharmacyById = async (id) => {
  const getRecord = DataBase.findOneById(id);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPharmacyByName = async (name) => {
  const getRecord = DataBase.findByQuery(name);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getNearByPharmacies = async (params) => {
  const getRecords = DataBase.findByLocation(params);

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const createPharmacy = async (data) => {
  const createSingleRecord = DataBase.createSingleRecord(data);

  const [err, result] = await to(createSingleRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const updatePharmacy = async (id, updateData) => {
  const updateRecord = DataBase.updateRecord(
    {
      where: { pharmacy_id: id },
    },
    updateData
  );

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const clinic = await DataBase.findOneById(id);

  return clinic;
};

const deletePharmacy = async (id) => {
  const deleteRecord = DataBase.deleteSingleRecord(id);

  const [err, result] = await to(deleteRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getAllPharmacies,
  getPharmacyById,
  getPharmacyByName,
  createPharmacy,
  getNearByPharmacies,
  updatePharmacy,
  deletePharmacy,
};
