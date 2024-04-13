const Doctor = require("../Doctor/Doctor");
const Clinic = require("../Clinic/Clinic");
const Visiting = require("./Visiting");
const ClinicAddress = require("../Clinic/ClinicAddress");

const createRecord = async (singleRecord) => {
  return await Visiting.create(singleRecord);
};

const deleteSingleRecord = async (condition) => {
  const result = await Visiting.destroy(condition);
  return result;
};

const updateRecord = async (condition, dataNeedToUpdate) =>
  await Visiting.update(dataNeedToUpdate, condition);

const findDoctorsByQuery = async (query) => {
  return await Visiting.findAll({
    where: query,
    include: [{ model: Doctor, as: "doctor" }],
  });
};

const findClinicsByQuery = async (query) => {
  return Visiting.findAll({
    where: query,
    include: [
      {
        model: Clinic,
        as: "clinic",
        include: [
          {
            model: ClinicAddress,
            as: "clinicAddress",
          },
        ],
      },
    ],
  });
};

module.exports = {
  Schema: Visiting,
  updateRecord: updateRecord,
  findDoctorsByQuery,
  findClinicsByQuery,
  createRecord,
  deleteSingleRecord,
};
