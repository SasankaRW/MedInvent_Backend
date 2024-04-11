const Clinic = require("./Clinic");
const ClinicAddress = require("./ClinicAddress");
const { Sequelize } = require("sequelize");

const createSingleRecord = async (singleRecord) => {
  const data = singleRecord.data;
  return await Clinic.create(
    {
      name: data.name,
      contactNo: data.contactNo,
      openHoursFrom: data.openHoursFrom,
      openHoursTo: data.openHoursTo,
      openDays: data.openDays,
      email: data.email,
      clinicAddress: data.clinicAddress,
      location: Sequelize.fn(
        "ST_SetSRID",
        Sequelize.fn(
          "ST_MakePoint",
          data.clinicLocation.long,
          data.clinicLocation.lat
        ),
        4326
      ),
    },
    {
      include: ["clinicAddress"],
    }
  );
};

const deleteSingleRecord = async (id) => {
  const result = await Clinic.destroy({ where: { clinic_id: id } });
  return result;
};

const updateMultipleRecords = async (query, updates) =>
  await Clinic.update(updates, query);

const updateRecord = async (condition, dataNeedToUpdate) =>
  await Clinic.update(dataNeedToUpdate, condition);

const findOneByQuery = async (id) => {
  return await Clinic.findByPk(id, {
    include: [{ model: ClinicAddress, as: "clinicAddress" }],
  });
};

const findByQuery = async () => {
  return await Clinic.findAll({
    include: [{ model: ClinicAddress, as: "clinicAddress" }],
  });
};

const findByLocation = async (params) => {
  const clinics = await Clinic.findAll({
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
        model: ClinicAddress,
        as: "clinicAddress",
      },
    ],
  });

  return clinics;
};

module.exports = {
  Schema: Clinic,
  updateRecord: updateRecord,
  findOneByQuery,
  findByQuery,
  findByLocation,
  updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
