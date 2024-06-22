const DataBase = require("./database");
const { Op } = require("sequelize");
const { to, TE } = require("../../helper");
const { native } = require("pg");

const NotificationFunctions = require("../PushNotification/notificationfunction");

const createSession = async (data) => {
  const createRecords = DataBase.createRecords(data);

  const [err, result] = await to(createRecords);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionById = async (id) => {
  const getRecord = DataBase.findOneById(id);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getUpcomingSessionsByDocID = async (docId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery(
    {
      doctor_id: docId,
      date: {
        [Op.gte]: today,
      },
    },
    "ASC"
  );

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPastSessionsByDocID = async (docId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery(
    {
      doctor_id: docId,
      date: {
        [Op.lt]: today,
      },
    },
    "DESC"
  );

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getUpcomingSessionsByClinicID = async (clinicId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery(
    {
      clinic_id: clinicId,
      date: {
        [Op.gte]: today,
      },
    },
    "ASC"
  );

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPastSessionsByClinicID = async (clinicId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery(
    {
      clinic_id: clinicId,
      date: {
        [Op.lt]: today,
      },
    },
    "DESC"
  );

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionsByDocAndClinicIDs = async (clinicId, docId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery(
    {
      clinic_id: clinicId,
      doctor_id: docId,
      date: {
        [Op.gte]: today,
      },
    },
    "ASC"
  );

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionsBySearch = async (query) => {
  const today = new Date();

  const getRecord = DataBase.findAllBySearch(query);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const updateSession = async (session_id, updateData) => {
  const updateRecord = DataBase.updateRecord(session_id, updateData);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const session = await DataBase.findOneById(session_id);

  return session;
};

const deleteSession = async (session_id) => {
  const deleteRecode = DataBase.deleteSingleRecord(session_id);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionsDetailsByClinicID = async (filter) => {
  const getRecode = DataBase.findAllSessionsByClicicID(filter);

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionsDetailsByDocID = async (docId) => {
  const getRecode = DataBase.findAllSessionsByDoctorID(docId);

  const [err, result] = await to(getRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const updateCancelSessionByID = async (session_id, updateData) => {
  const { clinic_id, doctor_id } = updateData;
  let dataNeedToUpdate;
  if (clinic_id != null) {
    dataNeedToUpdate = {
      isCancelled: true,
      cancelledById: clinic_id,
      cancelledByType: "clinic",
    };
  } else if (doctor_id != null) {
    dataNeedToUpdate = {
      isCancelled: true,
      cancelledById: doctor_id,
      cancelledByType: "doctor",
    };
  }

  const condition = {
    where: {
      session_id: session_id,
    },
  };

  const updateRecord = DataBase.updateisCancelled(condition, dataNeedToUpdate);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  if (result == 1) {
    //get userID set
    console.log("success first");
    const getRecordes = {
      where: {
        session_id: session_id,
        user_id: { [Op.not]: null },
      },
      attributes: ["user_id"],
    };

    //add try from here
    const getDetails = await DataBase.getPatientsdetails(getRecordes);

    //get active fcm token set and store in  TokenStorage=[];
    let TokenStorage = [];
    let userIDStorage = [];
    if (getDetails.length > 0) {
      for (let i = 0; i < getDetails.length; i++) {
        let sendUID = {
          userID: getDetails[i].user_id,
        };
        let getUserTokens = await DataBase.findAllTokens(sendUID);
        if (getUserTokens.length == 1) {
          for (let j = 0; j < getUserTokens[0].TokenStores.length; j++) {
            TokenStorage.push(getUserTokens[0].TokenStores[j].fcm_token);
            userIDStorage.push(getDetails[i].user_id);
          }
        }
      }
    } else {
      return "no patients";
    }

    //date,doc_fname,doc_mid_name,doc_lname,clinic_name
    // get session  details to store session cancel table
    const getsessionDetails = await DataBase.findOneByIdForNotifications(
      session_id
    );

    //rearrange data for store cancelSession table
    const { doctor, clinic, date } = getsessionDetails;
    const doctorFullName = `${doctor.fname} ${doctor.mname} ${doctor.lname}`;
    const clinicName = clinic.name;
    const formattedDate = new Date(date).toISOString().split("T")[0];

    //add cancel session details to  CancelSessionToupleArray=[];
    CancelSessionToupleArray = [];
    if (getsessionDetails != null) {
      for (let x = 0; x < TokenStorage.length; x++) {
        let createObeject = {
          userID: userIDStorage[x],
          doctorFullName: doctorFullName,
          clinicName: clinicName,
          fcm_token: TokenStorage[x],
          date: formattedDate,
        };
        CancelSessionToupleArray.push(createObeject);
      }
    } else {
      return "error occoured when getting session details";
    }

    //add cancel session details to cancelSession table in db
    let createCancelSessionTouples = await DataBase.createCancelSession(
      CancelSessionToupleArray
    );

    let sendNotificationResults = [];

    if (createCancelSessionTouples) {
      //send push notifications to users devices
      for (let x = 0; x < TokenStorage.length; x++) {
        const dataObject = {
          userID: userIDStorage[x],
        };
        sendNotificationResults.push(
          NotificationFunctions.sendPushNotification(
            2,
            dataObject,
            TokenStorage[x]
          )
        );
        console.log(sendNotificationResults[x]);
      }
    } else {
      return "createCancelSessionTouples not completed successfully";
    }

    const results = await Promise.all(
      sendNotificationResults.map((promise) => to(promise))
    );

    results.forEach(([err, result]) => {
      if (err) TE(err.errors ? err.errors[0].message : err);
      if (!result) TE("Notification sending failed");
    });

    return results;
  } else {
    return "iscancelled not updated correctly";
  }
  //return session;
};

const getCancelSessionsDetailsByUserID = async (userID) => {
  //const{fcm_token}=getBody;
  //fcm_token:fcm_token

  const getRecord = DataBase.findAllCancelledByQuery(
    {
      userID: userID,
    },
    "DESC"
  );

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const deleteCancelledSession = async (cancel_id) => {
  const deleteRecode = DataBase.deleteCancelledRecord(cancel_id);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const updateDocArrival = async (session_id, updateData) => {
  dataNeedToUpdate = updateData;

  const condition = {
    where: {
      session_id: session_id,
    },
  };

  const updateRecord = DataBase.updateisArrived(condition, dataNeedToUpdate);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  let getDataTostore;
  if (result == 1) {
    getDataTostore = await DataBase.getUserDocCliniTokendata(session_id);
    const user_id_array = getDataTostore[0].appointments;

    //get active fcm token set and store in  TokenStorage=[];
    let TokenStorage = [];
    let userIDStorage = [];
    if (user_id_array.length > 0) {
      for (let i = 0; i < user_id_array.length; i++) {
        let sendUID = {
          userID: user_id_array[i].user_id,
        };
        let getUserTokens = await DataBase.findAllTokens(sendUID);
        if (getUserTokens.length == 1) {
          for (let j = 0; j < getUserTokens[0].TokenStores.length; j++) {
            TokenStorage.push(getUserTokens[0].TokenStores[j].fcm_token);
            userIDStorage.push(user_id_array[i].user_id);
          }
        } else {
          return "no active tokens";
        }
      }
    } else {
      return "no patients";
    }

    //rearrange data for store cancelSession table
    const clinicName = getDataTostore[0].clinic.name;
    const doctorFullName = `${getDataTostore[0].doctor.fname} ${getDataTostore[0].doctor.mname} ${getDataTostore[0].doctor.lname}`;
    const date = getDataTostore[0].date;
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const sess_id = getDataTostore[0].session_id;

    //add cancel session details to  CancelSessionToupleArray=[];
    DoctorArrivalToupleArray = [];
    if (userIDStorage.length >= 1) {
      for (let x = 0; x < TokenStorage.length; x++) {
        let createObeject = {
          userID: userIDStorage[x],
          doctorFullName: doctorFullName,
          clinicName: clinicName,
          fcm_token: TokenStorage[x],
          date: formattedDate,
          session_id: sess_id,
        };
        DoctorArrivalToupleArray.push(createObeject);
      }
    } else {
      return "no user tokens and Ids";
    }

    //add cancel session details to cancelSession table in db
    let createCancelSessionTouples = await DataBase.createDoctorArriveRows(
      DoctorArrivalToupleArray
    );

    let sendNotificationResults = [];

    if (createCancelSessionTouples) {
      //send push notifications to users devices
      for (let x = 0; x < TokenStorage.length; x++) {
        const dataObject = {
          userID: userIDStorage[x],
        };
        sendNotificationResults.push(
          NotificationFunctions.sendPushNotification(
            3,
            dataObject,
            TokenStorage[x]
          )
        );
        console.log(sendNotificationResults[x]);
      }
    } else {
      return "createDoctorArriveRows not completed successfully";
    }

    const results = await Promise.all(
      sendNotificationResults.map((promise) => to(promise))
    );

    results.forEach(([err, result]) => {
      if (err) TE(err.errors ? err.errors[0].message : err);
      if (!result) TE("Notification sending failed");
    });

    return results;
  } else {
    return "error Occcoured when updating isArrived";
  }
};

const getDoctorArriveDetailsByUserID = async (userID) => {
  const getRecord = DataBase.findAllArriveMessagesByQuery(
    {
      userID: userID,
    },
    "DESC"
  );

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const deleteDoctorArriveRow = async (arrive_id) => {
  const deleteRecode = DataBase.deleteArriveRecord(arrive_id);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  createSession,
  getSessionById,
  getUpcomingSessionsByDocID,
  getPastSessionsByDocID,
  getUpcomingSessionsByClinicID,
  getPastSessionsByClinicID,
  getSessionsByDocAndClinicIDs,
  getSessionsBySearch,
  deleteSession,
  updateSession,
  getSessionsDetailsByClinicID,
  getSessionsDetailsByDocID,
  updateCancelSessionByID,
  getCancelSessionsDetailsByUserID,
  deleteCancelledSession,
  updateDocArrival,
  getDoctorArriveDetailsByUserID,
  deleteDoctorArriveRow,
};
