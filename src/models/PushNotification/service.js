const Constants = require("./constants");
const DataBase = require("./database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { to, TE } = require("../../helper");
//var admin = require("firebase-admin");
//var serviceAccount = require("../../../config/push-notification-key.json");
const crypto = require('crypto');
const NotificationFunctions = require('./notificationfunction');


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

//Function to generate a secure OTP
const generateOTP = (length) => {
    const otp = crypto.randomInt(0, Math.pow(10, length) + 1).toString().padStart(length, '0');
    return otp;
};

const sendOTPtoLInkUser = async (getBody) => {
    const{FcmTokens,senderName,senderUUID,receiverNic}=getBody;

    const numOfTokens = FcmTokens.length;
    const OTPToupleArray =[numOfTokens];
    const OTP=generateOTP(4);

    for(let i=0;i<numOfTokens;i++)
    {
        OTPToupleArray[i]={
            senderName :senderName,
            senderUUID:senderUUID,
            receiverNic:receiverNic,
            OTPNumber:OTP,
            receiverToken:FcmTokens[i]
        }
    }
  
    let createOTPRecode = await DataBase.createOTPRecordes(OTPToupleArray);
    let sendNotificationResults =[];

    if(createOTPRecode)
    {
        for(let i=0;i<numOfTokens;i++)
        {
            const dataObject = {
                OTP: OTP,
                sendBy: senderName,
                //senderUUID:senderUUID,
                password:"admin",
                receiverNic:receiverNic
            }
            sendNotificationResults .push(NotificationFunctions.sendPushNotification(0, dataObject, FcmTokens[i]));
            console.log(sendNotificationResults[i]);
        }
    }

    const results = await Promise.all(sendNotificationResults.map(promise => to(promise)));

    results.forEach(([err, result]) => {
        if (err) TE(err.errors ? err.errors[0].message : err);
        if (!result) TE("Notification sending failed");
    });

    return results;
};

// const sendPushNotification = (number,dataObject,fcm_token) => {

//     const notificationSet =[
//         {
//             title:"OTP to Link Your Account",
//             body:"Tap To View OTP"
//         },
//         {
//             title:"Time to get Medicine",
//             body:"Tap TO View Details"
//         },
//         {
//             title:"Session Cancel Reminder",
//             body:"Tap TO View Details"
//         },
//         {
//             title:"Appoinment Reminder",
//             body:"Tap TO View Details"
//         }
//     ]

//     try {
//         let message = {
//             notification: notificationSet[number],
//             data: dataObject,
//             token:fcm_token
//         };

//         return admin.messaging().send(message)
//             .then((response) => {
//                 return{
//                     message: "notification sent",
//                     response: response
//                 };
//             })
//             .catch((err) => {
//                 return{
//                     message: err.message,
//                     error: err
//                 };
//             });

//     } catch (err) {
//         return{
//             message: err.message,
//             error: err
//         };
//     }
// };

const checkOTP = async (getReqBody) => {
    try{
        const{senderUUID,receiverNic,OTPNumber}=getReqBody;
        let is_correctOTP=false;

        const findOTPObject = {
        where: {
            senderUUID:senderUUID,
            OTPNumber:OTPNumber,
            receiverNic:receiverNic
        },
        limit:1
        }

        let count = await DataBase.findOneByQuery(findOTPObject);
        if(count)
        {
            is_correctOTP = true;
        }
        return is_correctOTP;
    }
    catch(error)
    {
        throw error;
    }
    
} 

const getTokensToOTP = async (getBody) => {
    const getUserTokens= DataBase.findAllTokens(getBody);
  
    const [err, result] = await to(getUserTokens);
  
    if (err) TE(err);
  
    if (!result) TE("Result not found");
  
    return result;
};

const checkAvailability = async (getBody) => {
    const{mobileNo,nic}=getBody;

    const getUserObject = {
        where: {
            mobileNo:mobileNo,
            nic:nic,
        },
        attributes:['userID']
      }

    const checkUserAvailable= DataBase.findUser(getUserObject);
  
    const [err, result] = await to(checkUserAvailable);
  
    if (err) TE(err);
  
    if (!result) TE("Result not found");
  
    return result;
};

const addTokens = async (createData) => {

    const createSingleRecode = DataBase.createTokenRecode(createData);
  
    const [err, result] = await to(createSingleRecode);
  
    if (err) TE(err.errors[0] ? err.errors[0].message : err);
  
    if (!result) TE("Result not found");
  
    return result;
};
  
// const sendPushNotificationTemporary = (req, res, next) => {
//     try {
//         let message = {
//             notification: {
//                 title: "testNotification",
//                 body: "notification message"
//             },
//             data: {
//                 OTP: "123",
//                 sendBy: "isura",
//                 password:"admin"
//             },
//             token: req.body.fcm_token
//         };

//         admin.messaging().send(message)
//             .then((response) => {
//                 return res.status(200).send({
//                     message: "notification sent",
//                     response: response
//                 });
//             })
//             .catch((err) => {
//                 return res.status(500).send({
//                     message: err.message,
//                     error: err
//                 });
//             });

//     } catch (err) {
//         return res.status(500).send({
//             message: err.message,
//             error: err
//         });
//     }
// };

const updateIsActive = async (getBody) => {
    const{ userID , fcm_token , isActiveToken} = getBody;
    const updateData = {
        isActiveToken:isActiveToken
    }

    const updateRecord = DataBase.updateRecord(
      { 
        where: { 
            userID: userID ,
            fcm_token:fcm_token,
        }
      },
      updateData
    );
  
    const [err, result] = await to(updateRecord);
  
    if (err) TE(err.errors[0] ? err.errors[0].message : err);
  
    if (!result) TE("Result not found");

    const findUpdatedObject = {
        where: { 
            userID: userID ,
            fcm_token:fcm_token,
        }
    }
  
    const updatedData = await DataBase.findUpdatedData(findUpdatedObject);
  
    return updatedData;
};

const getAllOTP = async (getBody) => {
    const{receiverNic ,receiverToken} =getBody;
    const getRecode = DataBase.findAllOTPs({
      where:{
        receiverNic: receiverNic,
        receiverToken:receiverToken
      },
      order: [["createdAt", 'DESC']],
    });

    const [err, result] = await to(getRecode);
  
    if (err) TE(err);
  
    if (!result) TE("Result not found");
  
    return result;
};

const deleteReceivedOTP = async (OTP_id) => {
    const deleteRecode = DataBase.deleteReceivedOTPRecord(OTP_id);
  
    const [err, result] = await to(deleteRecode);
  
    if (err) TE(err);
  
    if (!result) TE("Result not found");
  
    return result;
  };
  
module.exports = {
    sendOTPtoLInkUser,
    //sendPushNotification,
    checkOTP,
    getTokensToOTP,
    checkAvailability,
    addTokens,
    updateIsActive,
   // sendPushNotificationTemporary,
    getAllOTP,
    deleteReceivedOTP,
};