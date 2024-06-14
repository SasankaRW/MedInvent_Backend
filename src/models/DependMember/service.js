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

  console.log(DependcCreateObject);
  const createSingleRecode = DataBase.createSingleRecode(DependcCreateObject);

  const [err, result] = await to(createSingleRecode);

  console.log(err);
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

const linkUserAsDepndMemberByID = async (getID,getReqBody) => {
  const{relationship,nic} = getReqBody;

  const getUserObject = {
    where: {
      nic:nic
    },
    attributes:['Fname','Lname','dob','gender','picPath']
  }
  const getUserdata = DataBase.findUserDetailsToLink(getUserObject);

  const [err, result] = await to(getUserdata);

  if (err) TE(err);

  if (!result) TE("Result not found");

  const{Fname,Lname,dob,gender,picPath}=result;

  const createData = {
    Fname:Fname,
    Lname:Lname,
    dob:formatDate(dob),
    relationship:relationship,
    gender:gender,
    picPath:"not added",
    nic:nic
  }
  console.log(createData);
  const finalResult = await createDependMemberData(getID,createData);

  return finalResult;
};

function formatDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


module.exports = {
  getAllPatientUsersDetails,

  getDependMembersDetailsByID,

  getDependMemberDetailsByID,

  createDependMemberData,

  updateDependMemberDetailsByID,

  deleteDependMemberDetailsByID,

  linkUserAsDepndMemberByID,
};
