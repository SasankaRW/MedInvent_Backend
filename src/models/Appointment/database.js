const { Op } = require("sequelize");
const sequelize = require("../../../config/database");
const Appointment = require("./Appointment");
const Session = require("../Session/Session");
const Doctor = require("../Doctor/Doctor");
const Clinic = require("../Clinic/Clinic");
const { sendSmsNotification } = require("../../../twilio/twilio");

const createSingleRecord = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const session = await Session.findByPk(data.session_id, {
      include: [
        {
          model: Clinic,
          as: "clinic",
          attributes: ["name"],
        },
        {
          model: Doctor,
          as: "doctor",
          attributes: ["fname", "mname", "lname", "specialization"],
        },
      ],
    });

    if (!session) {
      throw new Error("Session not found");
    }

    if (session.activePatients >= session.noOfPatients) {
      throw new Error("Session is full");
    }

    const appointmentCount = await Appointment.count({
      where: { session_id: data.session_id },
      transaction,
    });

    const appointmentNo = appointmentCount + 1;

    const newAppointment = await Appointment.create(
      {
        ...data,
        appointmentNo: appointmentNo,
      },
      { transaction }
    );

    await session.increment("activePatients", { by: 1 });

    await transaction.commit();

    // await sendSmsCreate(newAppointment.dataValues, session.dataValues);

    return newAppointment;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findOneById = async (id) => {
  return await Appointment.findByPk(id, {
    include: [
      {
        model: Session,
        as: "session",
        attributes: ["date", "timeFrom", "timeTo"],
        include: [
          {
            model: Doctor,
            as: "doctor",
            attributes: ["fname", "mname", "lname", "specialization"],
          },
          {
            model: Clinic,
            as: "clinic",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
};

const findAll = async (appointmentFilter, sessionFilter) => {
  return await Appointment.findAll({
    where: appointmentFilter,
    include: [
      {
        model: Session,
        as: "session",
        where: sessionFilter,
        attributes: ["date", "timeFrom", "timeTo", "docFee", "clinicFee"],
        include: [
          {
            model: Doctor,
            as: "doctor",
            attributes: ["fname", "mname", "lname", "specialization"],
          },
          {
            model: Clinic,
            as: "clinic",
            attributes: ["name"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const findByQuery = async (query) => {
  return await Appointment.findAll({
    where: {
      [Op.or]: [
        { patientName: { [Op.iLike]: `%${query}%` } },
        { contactNo: { [Op.iLike]: `%${query}%` } },
        { email: { [Op.iLike]: `%${query}%` } },
        { area: { [Op.iLike]: `%${query}%` } },
        { nic: { [Op.iLike]: `%${query}%` } },
      ],
    },
    include: [{ model: Session, as: "session" }],
  });
};

const deleteSingleRecord = async (id) => {
  return await Appointment.destroy({ where: { appointment_id: id } });
};

const updateMultipleRecords = async (query, updates) => {
  return await Appointment.update(updates, { where: query });
};

const updateRecord = async (appointmentId, data) => {
  const transaction = await sequelize.transaction();

  try {
    const appointment = await Appointment.findByPk(appointmentId, {
      transaction,
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    const session = await Session.findByPk(appointment.session_id, {
      include: [
        {
          model: Clinic,
          as: "clinic",
          attributes: ["name"],
        },
        {
          model: Doctor,
          as: "doctor",
          attributes: ["fname", "mname", "lname", "specialization"],
        },
      ],
    });

    if (!session) {
      throw new Error("Session not found");
    }

    await appointment.update({ isCancelled: true, ...data }, { transaction });
    await session.decrement("activePatients", { by: 1 }, { transaction });

    await transaction.commit();

    // await sendSmsCancel(appointment.dataValues, session.dataValues);

    return appointment;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const markAs = async (appointmentId, mark) =>
  await Appointment.update(mark, {
    where: { appointment_id: appointmentId },
  });

async function sendSmsCreate(appointment, session) {
  const { patientTitle, patientName, appointmentNo } = appointment;

  const { date, timeFrom, docFee, clinicFee, clinic, doctor } = session;

  const { name } = clinic.dataValues;

  const { fname, mname, lname, specialization } = doctor.dataValues;

  const message = `
    Your appointment has been successfully created.

  - Patient: ${patientTitle} ${patientName}
  - Doctor: Dr. ${fname} ${mname} ${lname} (${specialization})
  - Clinic: ${name}
  - Date: ${formatDate(date)}
  - Time: ${convertTimeTo12HourFormat(timeFrom)}

  - Appointment No: ${appointmentNo}

  - Fee: ${(parseFloat(docFee) + parseFloat(clinicFee)).toFixed(2)}`;

  sendSmsNotification(message);
}

async function sendSmsCancel(appointment, session) {
  const { patientTitle, patientName } = appointment;

  const { date, timeFrom, clinic, doctor } = session;

  const { name } = clinic.dataValues;

  const { fname, mname, lname, specialization } = doctor.dataValues;

  const message = `
    Your appointment has been cancelled.

  - Patient: ${patientTitle} ${patientName}
  - Doctor: Dr. ${fname} ${mname} ${lname} (${specialization})
  - Clinic: ${name}
  - Date: ${formatDate(date)}
  - Time: ${convertTimeTo12HourFormat(timeFrom)}`;

  sendSmsNotification(message);
}

function convertTimeTo12HourFormat(time) {
  const [hourString, minute, second] = time.split(":");
  let hour = parseInt(hourString, 10);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour}:${minute} ${period}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = weekdays[date.getDay()];

  const day = date.getDate();
  const month = months[date.getMonth()];

  const dayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  return `${dayOfWeek}, ${dayWithSuffix(day)} ${month}`;
}

module.exports = {
  Schema: Appointment,
  createSingleRecord,
  deleteSingleRecord,
  updateMultipleRecords,
  updateRecord,
  findOneById,
  findAll,
  findByQuery,
  markAs,
};
