const PatientUser = require("./patientUser");
const PatientAddress = require("./PatientAddress");

const createSingleRecord = async (singleRecord) => {
  return await PatientUser.create(singleRecord, {
    include: ["patientAddress"],
  });
};

const deleteSingleRecord = async (data) => {
  const result = await PatientUser.destroy({ where: { userID: data.userID } });
  return result;
};

const updateMultipleRecords = async (query, updates) =>
  await PatientUser.update(updates, query);

const updateRecord = async (condition, dataNeedToUpdate) =>
  await PatientUser.update(dataNeedToUpdate, condition);

const findOneByQuery = async (query) =>
  await PatientUser.findOne({
    ...query,
    include: [
      {
        model: PatientAddress,
        as: "patientAddress",
        attributes: ["lineOne", "lineTwo", "city", "district", "postalCode"],
      },
    ],
  });

const findByQuery = async (query) =>
  await PatientUser.findAll({
    ...query,
    include: [
      {
        model: PatientAddress,
        as: "patientAddress",
        attributes: ["lineOne", "lineTwo", "city", "district", "postalCode"],
      },
    ],
  });

module.exports = {
  Schema: PatientUser,
  updateRecord: updateRecord,
  findOneByQuery,
  findByQuery,
  updateMultipleRecords: updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
