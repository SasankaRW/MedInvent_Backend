const express = require("express");

const Controller = require("./controller");

const Validator = require("./vaidator");
 
const router = express.Router();

//add new session
//router.route("/add/new/DependMember/:userID").post(Validator.create,Controller.createDependMemberData);

//get all depenedant list details relevant to a specific Patientuser
//router.route("/get/DependMembers/details/:userID").get(Controller.getDependMembersDetailsByID);

//get all session details relevant to specific doctor
router.route("/get/Session/details/:doctor_id").get(Controller.getSessionsDetailsByDocID);

//get all dependant details in dependant table(not used in frontend)
//router.route("/get/DependMembers/details").get(Controller.getAllDependMembersDetails);

//update details relevant to a specific dependant who is a child of a specific PatientUser
//have set up to update any of the table field according to received request body
//router.route("/update/DependMember/:userID").put(Validator.update,Controller.updateDependMemberDetailsByID);

//delete a specific depend member row ,who is a child of a specific PatientUser
//router.route("/delete/DependMember/:userID").delete(Controller.deleteDependMemberDetailsByID);

module.exports = router;
