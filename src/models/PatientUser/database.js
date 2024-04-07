const PatientUser = require("./patientUser");

const createSingleRecode = async (singleRecode) => {
  return await PatientUser.create(singleRecode);
};

const deleteSingleRecode = async (data) => {
  const result = await PatientUser.destroy({ where: { userID: data.userID } });
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await PatientUser.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate) =>
  await PatientUser.update(dataNeedToUpdate, condition);

const findOneByQuery = async (query) => await PatientUser.findOne(query);

const findByQuery = async (query) => await PatientUser.findAll(query);

module.exports = {
  Schema: PatientUser,

  updateRecode: updateRecode,

  findOneByQuery,

  findByQuery,

  updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  deleteSingleRecode,
};
