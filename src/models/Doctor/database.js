const Doctor = require("./Doctor");

const createSingleRecord = async (singleRecord) => {
  return await Doctor.create(singleRecord.data);
};

const deleteSingleRecord = async (id) => {
  const result = await Doctor.destroy({ where: { doctor_id: id } });
  return result;
};

const updateMultipleRecords = async (query, updates) =>
  await Doctor.update(updates, query);

const updateRecord = async (condition, dataNeedToUpdate) =>
  await Doctor.update(dataNeedToUpdate, condition);

const findOneByQuery = async (id) => {
  return await Doctor.findByPk(id);
};

const findByQuery = async () => {
  return await Doctor.findAll();
};

module.exports = {
  Schema: Doctor,
  updateRecord: updateRecord,
  findOneByQuery,
  findByQuery,
  updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
