const Prescription = require("../src/models/Prescription/Prescription");
const PresMedicine = require("../src/models/Prescription/PresMedicine");
const sequelize = require("../config/database");
const { Op, Model, DATE } = require("sequelize");
const MedicationIntake = require("../src/models/Prescription/MedicationIntake");
const DependMember = require("../src/models/DependMember/DependMember");
const PatientUser = require("../src/models/PatientUser/patientUser");
const TokenStore = require("../src/models/PushNotification/TokenStore");


const findAllUserPrescriptions = async (todayDate,getCurrentTime) => {
  return await Prescription.findAll({
    attributes:['userID','presName'],
    where:{
        assignedTo: { [Op.not]: null },
        dID:{[Op.eq]: null}
    },
    include:[
        {
            model:PresMedicine,
            as:"presMedicine",
            required:true,
            attributes:['name','qty','mealTiming'],
            where:{
                reminders:{[Op.not]:null},
                remainingDays:{[Op.ne]:0}
            },
            include:[
                {
                    model:MedicationIntake,
                    as:"medicationIntake",
                    required:true,
                    where:{
                        date:{[Op.eq]:todayDate},
                        [Op.and]: [
                            sequelize.literal(`CAST("presMedicine->medicationIntake"."time" AS TEXT) LIKE '${getCurrentTime}%'`),
                            { taken: false }
                        ]
                    },
                    attributes:[],
                }
            ]
        }
    ]
  });
};

const findAllDependPrescriptions = async (todayDate,getCurrentTime) => {
    return await Prescription.findAll({
      attributes:['userID','presName','dID'],
      where:{
          assignedTo: { [Op.not]: null },
          dID:{[Op.ne]: null}
      },
      include:[
          {
              model:PresMedicine,
              as:"presMedicine",
              required:true,
              attributes:['name','qty','mealTiming'],
              where:{
                  reminders:{[Op.not]:null},
                  remainingDays:{[Op.ne]:0}
              },
              include:[
                  {
                      model:MedicationIntake,
                      as:"medicationIntake",
                      required:true,
                      where:{
                          date:{[Op.eq]:todayDate},
                          [Op.and]: [
                            sequelize.literal(`CAST("presMedicine->medicationIntake"."time" AS TEXT) LIKE '${getCurrentTime}%'`),
                            { taken: false }
                        ]
                      },
                      attributes:[],
                  }
              ]
          }
      ]
    });
};

const findUserActiveFcmTokens = async (getuserID)=>{
    return await PatientUser.findAll({
        include:[
            {
                model:TokenStore,
                required:true,
                where:{
                    isActiveToken:true,
                    userID:getuserID
                },
                attributes:['fcm_token']
            }
        ],
        attributes:[]
    });
};
  
const findUserPrescriptionFNames = async (getuserID)=>{
    return await PatientUser.findOne({
                where:{
                    userID:getuserID
                },
                attributes:['Fname']
    });
};

const findDependPrescriptionFNames = async (getDid)=>{
    return await DependMember.findOne({
                where:{
                    dID:getDid
                },
                attributes:['Fname']
    });
};


module.exports = {
  Schema: Prescription,
  findAllUserPrescriptions,
  findAllDependPrescriptions,
  findUserActiveFcmTokens,
  findUserPrescriptionFNames,
  findDependPrescriptionFNames
};
