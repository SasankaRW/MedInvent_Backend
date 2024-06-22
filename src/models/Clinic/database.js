const Clinic = require("./Clinic");
const ClinicAddress = require("./ClinicAddress");
const { Op, Sequelize } = require("sequelize");
const Session = require("../Session/Session");
const Doctor = require("../Doctor/Doctor");

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

const findOneById = async (id) => {
  return await Clinic.findByPk(id, {
    include: [{ model: ClinicAddress, as: "clinicAddress" }],
  });
};

const findAll = async () => {
  return await Clinic.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: ClinicAddress, as: "clinicAddress" }],
  });
};

const findByQuery = async (query) => {
  return await Clinic.findAll({
    where: {
      [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
    },
    include: [{ model: ClinicAddress, as: "clinicAddress" }],
  });
};

const findByLocation = async (params) => {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Colombo",
  });

  const clinics = await Clinic.findAll({
    where: Sequelize.where(
      Sequelize.fn(
        "ST_DWithin",
        Sequelize.col("Clinic.location"),
        Sequelize.fn(
          "ST_SetSRID",
          Sequelize.fn("ST_MakePoint", params.long, params.lat),
          4326
        ),
        5000
      ),
      true
    ),
    attributes: {
      exclude: ["createdAt", "updatedAt", "clinicFees"],
    },
    include: [
      {
        model: Session,
        as: "sessions",
        required: true,
        where: {
          date: today,
        },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "scheduledById",
            "scheduledByType",
            "cancelledById",
            "cancelledByType",
          ],
        },
        include: [
          {
            model: Doctor,
            as: "doctor",
            required: true,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Clinic,
            as: "clinic",
            attributes: ["name"],
            required: true,
          },
        ],
      },
    ],
  });

  return clinics;
};

module.exports = {
  Schema: Clinic,
  updateRecord: updateRecord,
  findOneById,
  findByQuery,
  findAll,
  findByLocation,
  updateMultipleRecords,
  createSingleRecord,
  deleteSingleRecord,
};
