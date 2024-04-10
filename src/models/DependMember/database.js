const { query } = require("express");
const DependMember = require("./DependMember");
//const PatientUser = require("../PatientUser/patientUser");

const createSingleRecode = async (DependcCreateObject) => {
  return await DependMember.create(DependcCreateObject);
};

const deleteSingleRecode = async (deleteDataObject) => {
  const result = await DependMember.destroy(deleteDataObject);
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await DependMember.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate) =>
  await DependMember.update(dataNeedToUpdate, condition);

const findAllByQuery = async (query) => await DependMember.findAll(query);

const findByQuery = async (query) => await DependMember.findAll(query);

const findOneByQuery = async(query)=> await DependMember.findOne(query);

module.exports = {
  Schema: DependMember,

  updateRecode: updateRecode,

  findAllByQuery,

  findByQuery,

  findOneByQuery,

  updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  deleteSingleRecode,
};
