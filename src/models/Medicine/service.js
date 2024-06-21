const DataBase = require("./database");
const { to, TE } = require("../../helper");

const getMedicineByName = async (name) => {
  const getRecord = DataBase.findByQuery(name);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getMedicineByName,
};
