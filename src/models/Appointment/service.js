const DataBase = require("./database");

const { to, TE } = require("../../helper");

const getUpcomingAppointments = async (params) => {
  const getRecords = DataBase.findByQuery();

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getPastAppointments = async (params) => {
    const getRecords = DataBase.findByQuery();
  
    const [err, result] = await to(getRecords);
  
    if (err) TE(err);
  
    if (!result) TE("Results not found");
  
    return result;
  };

  const createAppointment = async (data) => {
    const createSingleRecord = DataBase.createSingleRecord(data);
  
    const [err, result] = await to(createSingleRecord);
  
    if (err) TE(err.errors[0] ? err.errors[0].message : err);
  
    if (!result) TE("Result not found");
  
    return result;
  };

  const getAppointmentcById = async (id) => {
    const getRecord = DataBase.findOneByQuery(id);
  
    const [err, result] = await to(getRecord);
  
    if (err) TE(err);
  
    if (!result) TE("Result not found");
  
    return result;
  };
  const cancelAppointment = async (id, updateData) => {
    const updateRecord = DataBase.updateRecord(
      {
        where: { appointment_id: id },
      },
      updateData
    );
}

module.exports = {
    getUpcomingAppointments,
    getPastAppointments,
    createAppointment,
    getAppointmentcById,
    cancelAppointment,
  };
  