//const { error } = require("console");
const sequelize = require("../../../config/database");
const OTP =require("./OTP");
const TokenStore =require("./TokenStore");
const PatientUser =require("../PatientUser/patientUser");


const createOTPRecordes = async (OTPToupleArray) =>{
  let transaction;
  let is_succes =false;
  try{
    transaction=await sequelize.transaction();
    for(let i=0;i<OTPToupleArray.length;i++)
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

const findOneByQuery = async (query) =>{
      const{count} = await OTP.findAndCountAll(query);
      return count;
} 

const findAllTokens = async (getBody) => {

  const whereObject = {
    ...getBody,
    isActiveToken: true
  };

  const getTokensObject = {
    include: {
      model: TokenStore,
      where: whereObject,
      attributes: ['fcm_token']
    },
    attributes: []
  };

  const result = await PatientUser.findAll(getTokensObject);
  return result;
};

const findUser = async(query)=> await PatientUser.findOne(query);

const createTokenRecode = async (tokenAddObject) => {
  return await TokenStore.create(tokenAddObject);
};

const updateRecord = async (condition, dataNeedToUpdate) =>
  await TokenStore.update(dataNeedToUpdate, condition);

const findUpdatedData = async(query)=> await TokenStore.findOne(query);

const findAllOTPs = async(query)=> await OTP.findAll(query);
  
module.exports = {
  Schema: OTP,
  Schema: TokenStore,
  findOneByQuery,
  createOTPRecordes,
  findAllTokens,
  findUser,
  createTokenRecode,
  updateRecord,
  findUpdatedData,
  findAllOTPs
};
