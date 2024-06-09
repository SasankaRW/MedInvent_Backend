const DataBase = require("./database");

const { to, TE } = require("../../helper");

const { Op } = require("sequelize");

const sequelize = require("../../../config/database");

const getAllVisitingDoctors = async (clinic_id) => {
  const getRecords = DataBase.findDoctorsByQuery({
    clinic_id: clinic_id,
    isReqAccepted: true,
  });

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getAllVisitingClinics = async (doctor_id) => {
  const getRecords = DataBase.findClinicsByQuery({
    doctor_id: doctor_id,
    isReqAccepted: true,
  });

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getVisitingDoctorsByDocName = async (clinic_id, doc_name) => {
  const getRecords = DataBase.findDoctorsByQuery({
    clinic_id: clinic_id,
    isReqAccepted: true,
    [Op.or]: [
      sequelize.where(
        sequelize.fn("LOWER", sequelize.col("doctor.fname")),
        "LIKE",
        `%${doc_name.toLowerCase()}%`
      ),
      sequelize.where(
        sequelize.fn("LOWER", sequelize.col("doctor.mname")),
        "LIKE",
        `%${doc_name.toLowerCase()}%`
      ),
      sequelize.where(
        sequelize.fn("LOWER", sequelize.col("doctor.lname")),
        "LIKE",
        `%${doc_name.toLowerCase()}%`
      ),
    ],
  });

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getPendingDoctors = async (clinic_id) => {
  const getRecords = DataBase.findDoctorsByQuery({
    clinic_id: clinic_id,
    isReqAccepted: false,
    reqSentBy: "clinic",
  });

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getPendingClinics = async (doctor_id) => {
  const getRecords = DataBase.findClinicsByQuery({
    doctor_id: doctor_id,
    isReqAccepted: false,
    reqSentBy: "doctor",
  });

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getRequestedDoctors = async (clinic_id) => {
  const getRecords = DataBase.findDoctorsByQuery({
    clinic_id: clinic_id,
    isReqAccepted: false,
    reqSentBy: "doctor",
  });

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getRequestedClinics = async (doctor_id) => {
  const getRecords = DataBase.findClinicsByQuery({
    doctor_id: doctor_id,
    isReqAccepted: false,
    reqSentBy: "clinic",
  });

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const createVisiting = async (data) => {
  const createSingleRecord = DataBase.createRecord(data);

  const [err, result] = await to(createSingleRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const updateVisiting = async (query, updateData) => {
  const updateRecord = DataBase.updateRecord(
    {
      where: {
        clinic_id: query.clinicId,
        doctor_id: query.doctorId,
      },
    },
    updateData
  );

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");
};

const deleteVisiting = async (query) => {
  const deleteRecord = DataBase.deleteSingleRecord({
    where: {
      clinic_id: query.clinicId,
      doctor_id: query.doctorId,
    },
  });

  const [err, result] = await to(deleteRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getAllVisitingDoctors,
  getAllVisitingClinics,
  getVisitingDoctorsByDocName,
  getPendingDoctors,
  getPendingClinics,
  getRequestedDoctors,
  getRequestedClinics,
  createVisiting,
  updateVisiting,
  deleteVisiting,
};
