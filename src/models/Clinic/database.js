const Clinic = require("./Clinic");
const ClinicAddress = require("./ClinicAddress");
const ClinicLocation = require("./ClinicLocation");

const createSingleRecord = async (singleRecord) => {
  return await Clinic.create(singleRecord.data, {
    include: ["clinicAddress", "clinicLocation"],
  });
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
    include: [
      { model: ClinicAddress, as: "clinicAddress" },
      { model: ClinicLocation, as: "clinicLocation" },
    ],
  });
};

const findByQuery = async () => {
  return await Clinic.findAll({
    include: [
      { model: ClinicAddress, as: "clinicAddress" },
      { model: ClinicLocation, as: "clinicLocation" },
    ],
  });
};

module.exports = {
  Schema: Clinic,
  updateRecord: updateRecord,
  findOneByQuery,
  findByQuery,
  updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
