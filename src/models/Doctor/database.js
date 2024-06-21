const Doctor = require("./Doctor");
const { Op } = require("sequelize");
const sequelize = require("../../../config/database");

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

const findOneById = async (id) => {
  return await Doctor.findByPk(id);
};

const findAll = async () => {
  return await Doctor.findAll({
    order: [["createdAt", "DESC"]],
  });
};

const findByQuery = async (query) => {
  return await Doctor.findAll({
    where: {
      [Op.or]: [
        { fname: { [Op.iLike]: `%${query}%` } },
        { mname: { [Op.iLike]: `%${query}%` } },
        { lname: { [Op.iLike]: `%${query}%` } },
        sequelize.where(
          sequelize.fn(
            "concat_ws",
            " ",
            sequelize.col("fname"),
            sequelize.col("mname"),
            sequelize.col("lname")
          ),
          {
            [Op.iLike]: `%${query}%`,
          }
        ),
        sequelize.where(
          sequelize.fn(
            "concat_ws",
            " ",
            sequelize.col("fname"),
            sequelize.col("lname")
          ),
          {
            [Op.iLike]: `%${query}%`,
          }
        ),
        sequelize.where(
          sequelize.fn(
            "concat_ws",
            " ",
            sequelize.col("mname"),
            sequelize.col("lname")
          ),
          {
            [Op.iLike]: `%${query}%`,
          }
        ),
      ],
    },
  });
};

module.exports = {
  Schema: Doctor,
  updateRecord: updateRecord,
  findOneById,
  findByQuery,
  findAll,
  updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
