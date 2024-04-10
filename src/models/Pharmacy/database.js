const Pharmacy = require("./Pharmacy");
const PharmacyAddress = require("./PharmacyAddress");
const PharmacyLocation = require("./PharmacyLocation");
const { Op } = require("sequelize");

const createSingleRecord = async (singleRecord) => {
  return await Pharmacy.create(singleRecord, {
    include: ["pharmacyAddress", "pharmacyLocation"],
  });
};

const deleteSingleRecord = async (id) => {
  const result = await Pharmacy.destroy({ where: { pharmacy_id: id } });
  return result;
};

const updateMultipleRecords = async (query, updates) =>
  await Pharmacy.update(updates, query);

const updateRecord = async (condition, dataNeedToUpdate) =>
  await Pharmacy.update(dataNeedToUpdate, condition);

const findOneById = async (id) => {
  return await Pharmacy.findByPk(id, {
    include: [
      { model: PharmacyAddress, as: "pharmacyAddress" },
      { model: PharmacyLocation, as: "pharmacyLocation" },
    ],
  });
};

const findAll = async () => {
  return await Pharmacy.findAll({
    include: [
      { model: PharmacyAddress, as: "pharmacyAddress" },
      { model: PharmacyLocation, as: "pharmacyLocation" },
    ],
  });
};

const findByQuery = async (query) => {
  return await Pharmacy.findAll({
    where: {
      [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
    },
    include: [
      { model: PharmacyAddress, as: "pharmacyAddress" },
      { model: PharmacyLocation, as: "pharmacyLocation" },
    ],
  });
};

module.exports = {
  Schema: Pharmacy,
  updateRecord: updateRecord,
  findOneById,
  findByQuery,
  findAll,
  updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
