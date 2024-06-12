const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const createAppointment = async (req, res) => {
  try {
    const result = await Service.createAppointment(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getUserUpcomingAppointments = async (req, res) => {
  try {
    const result = await Service.getUserUpcomingAppointments(req.params.userId);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getUserPastAppointments = async (req, res) => {
  try {
    const result = await Service.getUserPastAppointments(req.params.userId);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getClinicUpcomingAppointments = async (req, res) => {
  try {
    const result = await Service.getClinicUpcomingAppointments(
      req.params.clinicId
    );
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getClinicPastAppointments = async (req, res) => {
  try {
    const result = await Service.getClinicPastAppointments(req.params.clinicId);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const result = await Service.getAppointmentcById(req.params.appointmentId);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const result = await Service.cancelAppointment(
      req.params.appointmentId,
      req.body
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const markAsPaid = async (req, res) => {
  try {
    const result = await Service.markAsPaid(req.params.appointmentId);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const markAsAttended = async (req, res) => {
  try {
    const result = await Service.markAsAttended(req.params.appointmentId);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getUserUpcomingAppointments,
  getUserPastAppointments,
  getClinicUpcomingAppointments,
  getClinicPastAppointments,
  createAppointment,
  getAppointmentById,
  cancelAppointment,
  markAsPaid,
  markAsAttended,
};
