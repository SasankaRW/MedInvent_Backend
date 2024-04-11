const Constants = require("./constants");

const DataBase = require("./database");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const { to, TE } = require("../../helper");

const getAllPatientUsersDetails = async (params) => {

  Object.assign(params);

  const getRecodes = DataBase.findByQuery();

  const [err, result] = await to(getRecodes);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getDependMembersDetailsByID = async (filter) => {
  const getRecode = DataBase.findAllByQuery({
    where:{
      userID: filter
    },
  });

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getDependMemberDetailsByID = async (getID,getReqBody) => {
  const{dID} = getReqBody;
  const storeDID = dID;
  const getMemberObject = {
    where: {
      userID:getID,
      dID:storeDID,
    }
  }
  const createSingleRecode = DataBase.findOneByQuery(getMemberObject);

  const [err, result] = await to(createSingleRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const createDependMemberData = async (getID,createData) => {
  const DependcCreateObject ={...createData,userID: getID};
  const createSingleRecode = DataBase.createSingleRecode(DependcCreateObject);

  const [err, result] = await to(createSingleRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const updateDependMemberDetailsByID = async (getID, getReqBody) => {

  const{dID} = getReqBody;
  const storeDID = dID;

  const possibleAttributes = ["Fname","Lname","dob","relationship","gender","picPath","nic"];
  let storeAttribute=null;

  possibleAttributes.forEach((attribute) => {
    if (getReqBody.hasOwnProperty(attribute)) {
       
       switch(attribute)
       {
          case "Fname" :
          {
            const{Fname}=getReqBody;
            storeAttribute={
              Fname:Fname
            }
            break;
          }
          case "Lname" :
          {
            const{Lname}=getReqBody;
            storeAttribute={
              Lname:Lname
            }
            break;
          }
          case "dob" :
          {
              const{dob}=getReqBody;
              storeAttribute={
                dob:dob
              }
              break;
          }
          case "relationship" :
          {   
              const{relationship}=getReqBody;
              storeAttribute={
                relationship:relationship
              }
              break;
          }
          case "gender" :
          {
              const{gender}=getReqBody;
              storeAttribute={
                gender:gender
              }
              break;
          }
          case "picPath" :
          {
              const{picPath}=getReqBody;
              storeAttribute={
                picPath:picPath
              }
              break;
          }
          case "nic" :
          {
              const{nic}=getReqBody;
              storeAttribute={
                nic:nic
              }
              break;
          }
          default : {
            storeAttribute={};
          }
       }
    }
  });

  const updateRecode = DataBase.updateRecode(
    { 
      where: {
        userID:getID,
        dID:storeDID
      }
    },
     storeAttribute
  );

  const [err, result] = await to(updateRecode);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const getMemberObject = {
    where: {
      userID:getID,
      dID:storeDID,
    }
  }
  const updatedDependantData = await DataBase.findOneByQuery(getMemberObject);

  return updatedDependantData;
};   

const deleteDependMemberDetailsByID = async (getID,getReqBody) => {
  const{dID} = getReqBody;
  const deleteDataObject ={
    where:{
      userID:getID,
      dID:dID
    }
  }
  const deleteRecode = DataBase.deleteSingleRecode(deleteDataObject);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  getAllPatientUsersDetails,

  getDependMembersDetailsByID,

  getDependMemberDetailsByID,

  createDependMemberData,

  updateDependMemberDetailsByID,

  deleteDependMemberDetailsByID,
};
