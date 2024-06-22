var admin = require("firebase-admin");
var fcm = require("fcm-notification");

var serviceAccount = require("../../../config/push-notification-key.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

exports.sendPushNotification = (req, res, next) => {
  try {
    let message = {
      Notification: {
        title: "test notification",
        body: "notification message",
      },
      data: {
        OTP: "123",
        sendBy: "isura",
      },
      token: req.body.fcm_token,
    };

    FCM.send(message, function (err, response) {
      if (err) {
        return res.status(500).send({
          message: err,
        });
      } else {
        return res.status(200).send({
          message: "notification send",
        });
      }
    });
  } catch (err) {
    throw err;
  }
};
