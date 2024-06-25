const PatientUser = require("../PatientUser/patientUser");
const Doctor = require("../Doctor/Doctor");
const Clinic = require("../Clinic/Clinic");
const { Sequelize } = require("sequelize");

const createUser = async (data, credentials, userId) => {
  let user;

  if (credentials.role === "patient") {
    user = await PatientUser.create(
      { ...data, userID: userId },
      {
        include: ["patientAddress"],
      }
    );
  } else if (credentials.role === "doctor") {
    user = await Doctor.create({ ...data, doctor_id: userId });
  } else if (credentials.role === "clinic") {
    user = await Clinic.create(
      {
        ...data.clinicDetails,
        clinic_id: userId,
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
      { include: ["clinicAddress"] }
    );
  }

  return user;
};

const getUserByRoleAndId = async (userID, roles) => {
  let user;

  if (roles.includes("patient")) {
    user = await PatientUser.findByPk(userID, {
      include: ["patientAddress"],
    });
  } else if (roles.includes("doctor")) {
    user = await Doctor.findByPk(userID);
  } else if (roles.includes("clinic")) {
    user = await Clinic.findByPk(userID, {
      include: ["clinicAddress"],
    });
  }

  return user;
};

module.exports = {
  createUser,
  getUserByRoleAndId,
};
