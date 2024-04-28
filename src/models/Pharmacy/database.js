const Pharmacy = require("./Pharmacy");
const PharmacyAddress = require("./PharmacyAddress");
const { Op, Sequelize } = require("sequelize");

const createSingleRecord = async (data) => {
  return await Pharmacy.create(
    {
      name: data.name,
      contactNo: data.contactNo,
      openHoursFrom: data.openHoursFrom,
      openHoursTo: data.openHoursTo,
      openDays: data.openDays,
      email: data.email,
      pharmacyAddress: data.pharmacyAddress,
      location: Sequelize.fn(
        "ST_SetSRID",
        Sequelize.fn(
          "ST_MakePoint",
          data.pharmacyLocation.long,
          data.pharmacyLocation.lat
        ),
        4326
      ),
    },
    {
      include: ["pharmacyAddress"],
    }
  );
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
    include: [{ model: PharmacyAddress, as: "pharmacyAddress" }],
  });
};

const findAll = async () => {
  return await Pharmacy.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: PharmacyAddress, as: "pharmacyAddress" }],
  });
};

const findByQuery = async (query) => {
  return await Pharmacy.findAll({
    where: {
      [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
    },
    include: [{ model: PharmacyAddress, as: "pharmacyAddress" }],
  });
};

const findByLocation = async (params) => {
  const pharmacies = await Pharmacy.findAll({
    where: Sequelize.where(
      Sequelize.fn(
        "ST_DWithin",
        Sequelize.col("location"),
        Sequelize.fn(
          "ST_SetSRID",
          Sequelize.fn("ST_MakePoint", params.long, params.lat),
          4326
        ),
        5000
      ),
      true
    ),
    include: [
      {
        model: PharmacyAddress,
        as: "pharmacyAddress",
      },
    ],
  });

  return pharmacies;
};

module.exports = {
  Schema: Pharmacy,
  updateRecord: updateRecord,
  findOneById,
  findByQuery,
  findAll,
  findByLocation,
  updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
