const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const createSession = async (req, res) => {
  try {
    const result = await Service.createSession(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getSessionById = async (req, res) => {
  try {
    const result = await Service.getSessionById(req.params.session_id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getUpcomingSessionsByDocID = async (req, res) => {
  try {
    const result = await Service.getUpcomingSessionsByDocID(
      req.params.doctor_id
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPastSessionsByDocID = async (req, res) => {
  try {
    const result = await Service.getPastSessionsByDocID(req.params.doctor_id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getUpcomingSessionsByClinicID = async (req, res) => {
  try {
    const result = await Service.getUpcomingSessionsByClinicID(
      req.params.clinic_id
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPastSessionsByClinicID = async (req, res) => {
  try {
    const result = await Service.getPastSessionsByClinicID(
      req.params.clinic_id
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getSessionsByDocAndClinicIDs = async (req, res) => {
  try {
    const result = await Service.getSessionsByDocAndClinicIDs(
      req.query.clinic_id,
      req.query.doctor_id
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateSession = async (req, res) => {
  try {
    const result = await Service.updateSession(req.params.session_id, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteSession = async (req, res) => {
  try {
    const result = await Service.deleteSession(req.params.session_id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  createSession,
  getSessionById,
  getUpcomingSessionsByDocID,
  getPastSessionsByDocID,
  getPastSessionsByClinicID,
  getUpcomingSessionsByClinicID,
  getSessionsByDocAndClinicIDs,
  deleteSession,
  updateSession,
};
