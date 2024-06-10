const { query } = require("express");
// const DependMember = require("./DependMember");

const createSingleRecode = async (DependcCreateObject) => {
  return await DependMember.create(DependcCreateObject);
};

const findByQuery = async (query) => await DependMember.findAll(query);

module.exports = {
  //Schema: DependMember,
  findByQuery,
  createSingleRecode,
};
