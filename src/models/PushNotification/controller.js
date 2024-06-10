//const Service = require("./service");

//const { SUCCESS, ERROR } = require("../../helper");




var admin = require("firebase-admin");

var serviceAccount = require("../../../config/push-notification-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.sendPushNotification = (req, res, next) => {
    try {
        let message = {
            notification: {
                title: "test notification",
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

// const createDependMemberData = async (req, res) => {
//     try {
//       const result = await Service.createDependMemberData(req.params.userID,req.body);
  
//       SUCCESS(res, SUC_CODES, result, req.span);
//     } catch (error) {
//       console.log(error);
  
//       ERROR(res, error, res.span);
//     }
// };



// module.exports = {
//     createDependMemberData,
// };
  