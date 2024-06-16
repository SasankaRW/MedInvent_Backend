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
  const{Fname,Lname,dob,relationship,gender,picPath,nic}=createData;

  const DependcCreateObject = {
    Fname:Fname,
    Lname:Lname,
    dob:dob,
    relationship:relationship,
    gender:gender,
    picPath:picPath,
    nic:nic,
    userID: getID
  }
 // const DependcCreateObject ={...createData,userID: getID};

  console.log(DependcCreateObject);
  const createSingleRecode = DataBase.createSingleRecode(DependcCreateObject);

  const [err, result] = await to(createSingleRecode);

  console.log(err);
  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const updateDependMemberDetailsByID = async (getID,getBody) => {
  const{dID ,Fname,Lname,dob,relationship,gender,picPath,nic} = getBody;
  const updateData = {
    Fname:Fname,
    Lname:Lname,
    dob:dob,
    relationship:relationship,
    gender:gender,
    picPath:picPath,
    nic:nic
  }

  const updateRecord = DataBase.updateRecode(
    { 
      where:{ 
        userID:getID,
        dID:dID,
      }
    },
    updateData
  );

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const findUpdatedObject = {
      where: { 
        userID:getID,
        dID:dID,
      }
  }

  const updatedData = await DataBase.findOneByQuery(findUpdatedObject);

  return updatedData;
};

const deleteDependMemberDetailsByID = async (getID) => {
  const deleteDataObject ={
    where:{
      dID:getID
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
