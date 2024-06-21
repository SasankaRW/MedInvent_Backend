const Service = require("./service");
const { SUCCESS, ERROR } = require("../../helper");
const { SUC_CODES } = require("./constants").Codes;

const getMedicineByName = async (req, res) => {
  try {
    const result = await Service.getMedicineByName(req.params.name);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getMedicineByName,
};
