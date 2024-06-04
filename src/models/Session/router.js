const express = require("express");

const Controller = require("./controller");

const Validator = require("./vaidator");
 
const router = express.Router();


//Create Session Data
router
    .route("/add/new/session")
    .post(Validator.create, Controller.createSessionData);


//get session details relevant to a specific session ID
router 
    .route("/get/Session/details/:session_id")
    .get(Controller.getSessionDetailsByID);

//get all session details relevant to specific doctor for session calendar
router
    .route("/get/All/Sessions/details/:doctor_id")
    .get(Controller.getSessionsDetailsByDocID);

//get all dependant details in dependant table(not used in frontend)
//router.route("/get/DependMembers/details").get(Controller.getAllDependMembersDetails);

// Session cancel by doctor or clinic using session calendar or upcoming session page
router
    .route("/update/Cancel/Session/:session_id")
    .put(Validator.update,Controller.updateCancelSessionByID);

//delete a specific depend member row ,who is a child of a specific PatientUser
//router.route("/delete/DependMember/:userID").delete(Controller.deleteDependMemberDetailsByID);

module.exports = router;
