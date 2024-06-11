const Constants = require("./constants");
const DataBase = require("./database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { to, TE } = require("../../helper");
var admin = require("firebase-admin");
var serviceAccount = require("../../../config/push-notification-key.json");
const crypto = require('crypto');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Function to generate a secure OTP
const generateOTP = (length) => {
    const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
    return otp;
};

const sendOTPtoLInkUser = async (getBody) => {
    const{FcmTokens,senderName,senderUUID,receiverNic}=getBody;

    const numOfTokens = FcmTokens.length;
    const OTPToupleArray =[numOfTokens];
    const OTP=generateOTP(6);

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
    let sendNotification;

    if(createOTPRecode)
    {
        for(let i=0;i<numOfTokens;i++)
        {
            const dataObject = {
                OTP: OTP,
                sendBy: senderName,
                senderUUID:senderUUID
            }
            sendNotification = await sendPushNotification(0,dataObject,FcmTokens[i]);
        }
    }

    const [err, result] = await to(sendNotification);
  
    if (err) TE(err.errors[0] ? err.errors[0].message : err);
  
    if (!result) TE("");
    
    return result;
};

const sendPushNotification = (number,dataObject,fcm_token) => {

    const notificationSet =[
        {
            title:"OTP to Link Your Account",
            body:"Tap To View OTP"
        },
        {
            title:"Time to get Medicine",
            body:"Tap TO View Details"
        },
        {
            title:"Session Cancel Reminder",
            body:"Tap TO View Details"
        },
        {
            title:"Appoinment Reminder",
            body:"Tap TO View Details"
        }
    ]

    try {
        let message = {
            notification: notificationSet[number],
            data: dataObject,
            token:fcm_token//var
        };

        admin.messaging().send(message)
            .then((response) => {
                return{
                    message: "notification sent",
                    response: response
                };
            })
            .catch((err) => {
                return{
                    message: err.message,
                    error: err
                };
            });

    } catch (err) {
        return{
            message: err.message,
            error: err
        };
    }
};


const sendPushNotificationTemporary = (req, res, next) => {
    try {
        let message = {
            notification: {
                title: "testNotification",
                body: "notification message"
            },
            data: {
                OTP: "123",
                sendBy: "isura",
                password:"admin"
            },
            token: req.body.fcm_token
        };

        admin.messaging().send(message)
            .then((response) => {
                return res.status(200).send({
                    message: "notification sent",
                    response: response
                });
            })
            .catch((err) => {
                return res.status(500).send({
                    message: err.message,
                    error: err
                });
            });

    } catch (err) {
        return res.status(500).send({
            message: err.message,
            error: err
        });
    }
};

module.exports = {
    sendOTPtoLInkUser,
    sendPushNotification,
    sendPushNotificationTemporary
};