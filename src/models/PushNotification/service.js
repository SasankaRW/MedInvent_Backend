const Constants = require("./constants");

const DataBase = require("./database");

const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const { to, TE } = require("../../helper");



const createDependMemberData = async (getID,createData) => {
    const DependcCreateObject ={...createData,userID: getID};
  
    console.log(DependcCreateObject);
    const createSingleRecode = DataBase.createSingleRecode(DependcCreateObject);
  
    const [err, result] = await to(createSingleRecode);
  
    if (err) TE(err.errors[0] ? err.errors[0].message : err);
  
    if (!result) TE("Result not found");
  
    return result;
};


module.exports = {
    createDependMemberData,
};