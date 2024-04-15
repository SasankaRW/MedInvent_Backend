const { query } = require("express");
const Session = require("./Session");
const SessionDates = require("./SessionDates");
const Clinic = require("../Clinic/Clinic");
const Doctor = require("../Doctor/Doctor");


const createSingleRecode = async (DependcCreateObject) => {
  return await Session.create(DependcCreateObject);
};

const deleteSingleRecode = async (deleteDataObject) => {
  const result = await Session.destroy(deleteDataObject);
  return result;
};

const updateMultipleRecodes = async (query, updates) =>
  await Session.update(updates, query);

const updateRecode = async (condition, dataNeedToUpdate) =>
  await Session.update(dataNeedToUpdate, condition);

const findAllByQuery = async (filter) => {
    const getSessionsObject = {
        include: [
            {
                model:Session,
                where:{
                    doctor_id:filter
                },
                include:[
                    {
                        model:SessionDates,
                        required:true,
                    },
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

const findByQuery = async (query) => await Session.findAll(query);

const findOneByQuery = async(query)=> await Session.findOne(query);

module.exports = {
  Schema: Session,

  updateRecode: updateRecode,

  findAllByQuery,

  findByQuery,

  findOneByQuery,

  updateMultipleRecodes: updateMultipleRecodes,

  createSingleRecode,

  deleteSingleRecode,
};
