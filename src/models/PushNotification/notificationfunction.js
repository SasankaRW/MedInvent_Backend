var admin = require("firebase-admin");
var serviceAccount = require("../../../config/push-notification-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


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
            token:fcm_token
        };

        return admin.messaging().send(message)
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
   sendPushNotification,
   sendPushNotificationTemporary, 
};