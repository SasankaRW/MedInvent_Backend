const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getAllPharmacies = async (req, res) => {
  try {
    const result = await Service.getAllPharmacies(req.query);
    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (err) {
    console.log(err);
    ERROR(res, err, res.span);
  }
};

const createPharmacy = async (req, res) => {
  try {
    const result = await Service.createPharmacy(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPharmacyById = async (req, res) => {
  try {
    const result = await Service.getPharmacyById(req.params.id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getPharmacyByName = async (req, res) => {
  try {
    const result = await Service.getPharmacyByName(req.params.name);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getNearByPharmacies = async (req, res) => {
  try {
    const result = await Service.getNearByPharmacies(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updatePharmacy = async (req, res) => {
  try {
    const result = await Service.updatePharmacy(req.params.id, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deletePharmacy = async (req, res) => {
  try {
    const result = await Service.deletePharmacy(req.params.id);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getAllPharmacies,
  createPharmacy,
  getPharmacyById,
  getPharmacyByName,
  getNearByPharmacies,
  deletePharmacy,
  updatePharmacy,
};
