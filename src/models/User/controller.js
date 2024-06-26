const Service = require("./service");
const { SUCCESS, ERROR } = require("../../helper");
const { SUC_CODES } = require("./constants").Codes;

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Service.logInUser(email, password);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const createUser = async (req, res) => {
  try {
    const { data, credentials, accessToken: providedAccessToken } = req.body;

    const result = await Service.createUser(
      data,
      credentials,
      providedAccessToken
    );

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.resetPassword(id);

    SUCCESS(res, SUC_CODES, { message: "email sent" }, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await Service.updateUser(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  logInUser,
  createUser,
  resetPassword,
  updateUser,
};
