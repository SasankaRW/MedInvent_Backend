const PatientUser = require("./patientUser");

const createSingleRecode = async (singleRecode) => {
  return await PatientUser.create(singleRecode);
};

// const deleteSingleRecode = async (data) => {
//   const result = await Restaurant.destroy({ where: { id: data.id } });
//   return result;
// };

// const updateMultipleRecodes = async (query, updates) =>
//   await Restaurant.update(updates, query);

// const updateRecode = async (condition, dataNeedToUpdate) =>
//   await Restaurant.update(dataNeedToUpdate, condition);

//const findOneByQuery = async (query) => await Restaurant.findOne(query);

//const findByQuery = async (query) => await Restaurant.findAll(query);

module.exports = {
  Schema: PatientUser,

 // updateRecode: updateRecode,

  //findOneByQuery,

  //findByQuery,

  //updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  //deleteSingleRecode,
};
