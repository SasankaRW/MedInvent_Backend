//const { error } = require("console");
const sequelize = require("../../../config/database");
const OTP =require("./OTP");

const createOTPRecordes = async (OTPToupleArray) =>{
  let transaction;
  let is_succes =false;
  try{
    transaction=await sequelize.transaction();
    for(const i=0;i<OTPToupleArray.length;i++)
    {
      await OTP.create(OTPToupleArray[i],{transaction});
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

const findByQuery = async (query) => await DependMember.findAll(query);

module.exports = {
  Schema: OTP,
  findByQuery,
  createOTPRecordes,
};
