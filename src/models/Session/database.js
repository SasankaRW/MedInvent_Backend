const sequelize = require("../../../config/database");
const Session = require("./Session");
const Clinic = require("../Clinic/Clinic");
const Doctor = require("../Doctor/Doctor");
const Appointment =require("../Appointment/Appointment");
const TokenStore=require("../PushNotification/TokenStore");
const CancelSession=require("../Session/CancelSession");

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

const findByQuery = async (query) => await Session.findAll(query);

const findOneByQuery = async(query)=> await Session.findOne(query);
  
// newly added below onwards
const findAllSessionsByDoctorID = async (filter) => {
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

const updateisCancelled = async (condition, dataNeedToUpdate) =>
{
  const [updated] = await Session.update( dataNeedToUpdate,condition);
  return updated;
}

const getPatientsdetails = async (query) => await Appointment.findAll(query);

const findAllTokens = async (getBody) => {

  const whereObject = {
    ...getBody,
    isActiveToken: true
  };

  const getTokensObject = {
    include:{
      model: TokenStore,
      where: whereObject,
      attributes: ['fcm_token']
    },
    attributes: []
  };

  const result = await PatientUser.findAll(getTokensObject);
  return result;
};

const findOneByIdForNotifications = async (id) => {
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
    attributes:["date"]
  });
};

const createCancelSession = async (CancelSessionToupleArray) =>{
  let transaction;
  let is_succes =false;
  try{
    transaction=await sequelize.transaction();
    for(let i=0;i<CancelSessionToupleArray.length;i++)
    {
      await CancelSession.create(CancelSessionToupleArray[i],{transaction});
    }
    await transaction.commit();
  }catch(error)
  {
    if(transaction)await transaction.rollback();
    throw error;
  }
  is_succes=true;
  return is_succes;
};


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
  findAllSessionsByDoctorID,
  updateisCancelled,
  getPatientsdetails,
  findAllTokens,
  findOneByIdForNotifications,
  createCancelSession
};
