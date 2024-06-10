const sequelize = require("../../../config/database");
const Session = require("./Session");
const Clinic = require("../Clinic/Clinic");
const Doctor = require("../Doctor/Doctor");

const createRecords = async (data) => {
  const { dates, ...sessionData } = data;
  const sessions = [];
  let transaction;

  try {
    transaction = await sequelize.transaction();
    for (const date of dates) {
      const singleRecord = {
        ...sessionData,
        date: date,
      };
      const session = await Session.create(singleRecord, { transaction });
      sessions.push(session);
    }
    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }

  return sessions[0];
};

const findOneById = async (id) => {
  return await Session.findByPk(id, {
    include: [
      {
        model: Clinic,
        as: "clinic",
        attributes: ["name"],
      },
      {
        model: Doctor,
        as: "doctor",
        attributes: ["fname", "mname", "lname"],
      },
    ],
  });
};

const deleteSingleRecord = async (session_id) => {
  const result = await Session.destroy({ where: { session_id: session_id } });
  return result;
};

const findAllByQuery = async (filter, order) => {
  return await Session.findAll({
    where: filter,
    include: [
      {
        model: Clinic,
        as: "clinic",
        attributes: ["name"],
      },
      {
        model: Doctor,
        as: "doctor",
        attributes: ["fname", "mname", "lname"],
      },
    ],
    order: [["date", order]],
  });
};

const updateRecord = async (session_id, dataNeedToUpdate) =>
  await Session.update(dataNeedToUpdate, {
    where: {
      session_id: session_id,
    },
  });
const updateRecode = async (condition, dataNeedToUpdate) =>
  await Session.update(dataNeedToUpdate, condition);

const findAllByQuerys = async (filter) => {
    const getSessionsObject = {
        include: [
            {
                model:Session,
                where:{
                    doctor_id:filter
                },
                include:[
                    {
                        model:Clinic,
                        required:true,
                    }
                ]
            }
        ]
      }
    
   //after 34 require:true,
   const result =  await Doctor.findAll(getSessionsObject);
   return result;
}

const findAllSessionsByClicicID = async (filter) => {
  const getSessionsObject = {
      include: [
          {
              model:Session,
              where:{
                clinic_id:filter
              },
              include:[
                  {
                      model:Doctor,
                      required:true,
                  }
              ]
          }
      ]
  }
  
 const result =  await Clinic.findAll(getSessionsObject);
 return result;
}

const findByQuery = async (query) => await Session.findAll(query);

const findOneByQuery = async(query)=> await Session.findOne(query);

module.exports = {
  Schema: Session,
  findOneById,
  findAllByQuery,
  createRecords,
  updateRecord,
  deleteSingleRecord,
  findAllSessionsByClicicID,
  findByQuery,
  findOneByQuery,
  findAllByQuerys
};
