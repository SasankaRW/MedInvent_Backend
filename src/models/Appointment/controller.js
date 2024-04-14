const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getUpcomingAppointments = async (req, res) => {
  try {
    const result = await Service.gettUpcomingAppointmentss(req.query);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const getPastAppointments = async (req, res) => {
    try {
      const result = await Service.getPastAppointmentss(req.query);
      SUCCESS(res, SUC_CODES, result, req.span);
    } catch (err) {
      console.log(err);
      ERROR(res, err, res.span);
    }
  };

  const createAppointment = async (req, res) => {
    try {
      const result = await Service.createAppointment(req.body);
  
      SUCCESS(res, SUC_CODES, result, req.span);
    } catch (error) {
      console.log(error);
  
      ERROR(res, error, res.span);
    }
  };
  

  const getAppointmentcById = async (req, res) => {
    try {
      const result = await Service.getAppointmentcById(req.params.id);
  
      SUCCESS(res, SUC_CODES, result, req.span);
    } catch (error) {
      console.log(error);
  
      ERROR(res, error, res.span);
    }
  };

  const cancelAppointment = async (req, res) => {
    try {
      const result = await Service.cancelAppointment(req.params.id, req.body);
  
      SUCCESS(res, SUC_CODES, result, req.span);
    } catch (error) {
      console.log(error);
  
      ERROR(res, error, res.span);
    }
  };


  module.exports = {
    getUpcomingAppointments,
    getPastAppointments,
    createAppointment,
    getAppointmentcById,
    cancelAppointment
  };
  