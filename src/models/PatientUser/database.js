const PatientUser = require("./patientUser");
const PatientAddress = require("./PatientAddress");

const createSingleRecode = async (singleRecode) => {
  return await PatientUser.create(singleRecode, {
    include: ["patientAddress"],
  });
};

const deleteSingleRecode = async (data) => {
  const result = await PatientUser.destroy({ where: { userID: data.userID } });
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await PatientUser.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate) =>
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

  updateRecode: updateRecode,

  findOneByQuery,

  findByQuery,

  updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  deleteSingleRecode,
};
