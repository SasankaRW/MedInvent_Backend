const { createSingleRecord } = require("../Clinic/database");
const Appointment = require("./Appointment");
const { Sequelize } = require("sequelize");

const createSingleRecord = async(singleRecord) =>{
    const data= singleRecord.data;
    return await Appointment.create(
        {
            appointmentNo: data.no,
        }
    )
}

const findByQuery = async () => {
    return await Appointment.findByPk(id, {
        include: [{model: A}]
    })
}

module.exports = {
    Schema: Appointment,
    updateRecord: updateRecord,
    findOneByQuery,
    findByQuery,
    findByLocation,
    updateMultipleRecords,
    createSingleRecord,
    deleteSingleRecord,
  };