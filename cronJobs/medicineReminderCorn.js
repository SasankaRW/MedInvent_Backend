// const cron = require("node-cron");
// const sequelize = require("../config/database");
// const PresMedicine = require("../src/models/Prescription/PresMedicine");
// const { Op } = require("sequelize");
// const NotificationFunctions = require("../src/models/PushNotification/notificationfunction");


// cron.schedule("* * * * *", async () => {
//   try {
//         const getTodayDate = () => {
//             const today = new Date();
//             return today.toISOString().split('T')[0]; // This formats the date to 'YYYY-MM-DD'
//         };
        
//         const getCurrentTime = () => {
//             const now = new Date();
//             const hours = String(now.getHours()).padStart(2, '0');
//             const minutes = String(now.getMinutes()).padStart(2, '0');
//             return `${hours}:${minutes}`;
//         };

//         sendReminders();
        
//         const sendReminders = async () => {
        
//             const todayDate = getTodayDate();
//             const currentTime = getCurrentTime();
        
//             const getUserPres =await DataBase.findAllUserPrescriptions(todayDate,currentTime);
//             const getDependPres = await DataBase.findAllDependPrescriptions(todayDate,currentTime);

//             let userPreNameStorage=[];
//             let dependPreNameStorage=[];


//             for(let w=0;w<getUserPres.length;w++){
//                let getUserPresNames = await DataBase.findUserPrescriptionFNames(getUserPres[w].userID);
//                if(getUserPresNames != null)
//                 {
//                     userPreNameStorage.push(getUserPresNames.Fname);
//                 }
//             }

//             for(let w=0;w<getUserPres.length;w++){
//                 let getDependPresNames = await DataBase.findUserPrescriptionFNames(getDependPres[w].dID);
//                 if(getDependPresNames != null)
//                  {
//                     dependPreNameStorage.push(getDependPresNames.Fname);
//                  }
//              }


//             let TokenStorageUser = [];
//             let userIDStorageUser = [];

//             let TokenStorageDepend = [];
//             let userIDStorageDepend = [];

//             let userPresHave =false;
//             let depenpreshave= false;

//             let userActiveTokenHave =false;
//             let dependActiveTokenHave =false;

//             if(getUserPres.length>0){
//                  //get active fcm token set and store in  TokenStorage=[];
//                 if (getUserPres.length > 0) {
//                 for (let i = 0; i < getUserPres.length; i++) {
//                     let getUserTokens = await DataBase.findUserActiveFcmTokens(getUserPres[i].userID);
//                     if (getUserTokens.length == 1) {
//                         for (let j = 0; j < getUserTokens[0].TokenStores.length; j++) {
//                             TokenStorageUser.push(getUserTokens[0].TokenStores[j].fcm_token);
//                             userIDStorageUser.push(getUserPres[i].userID);
//                         }
//                         userActiveTokenHave =true;
//                     }
//                 }
//                  userPresHave=true;
//                 }
//             }

//             if(getDependPres.length>0){
//                 //get active fcm token set and store in  TokenStorage=[];
//                if (getDependPres.length > 0) {
//                for (let i = 0; i < getDependPres.length; i++) {
//                    let getUserTokens = await DataBase.findUserActiveFcmTokens(getDependPres[i].userID);
//                    if (getUserTokens.length == 1) {
//                         for (let j = 0; j < getUserTokens[0].TokenStores.length; j++) {
//                             TokenStorageDepend.push(getUserTokens[0].TokenStores[j].fcm_token);
//                             userIDStorageDepend.push(getDependPres[i].userID);
//                         }
//                         dependActiveTokenHave=true;
//                    }
//                }
//                 depenpreshave=true;
//                }
//             }

//             let finalTokenList=[];
//             let finalUIDList=[];
//             let finalPresNameList=[];
//             let finalMedNameList=[];
//             let finalMedQtyList=[];
//             let finalMedMealTimeList=[];
//             let finalPatientNameList=[];


//             if(userActiveTokenHave && userPresHave) {
//                     for(let i=0; i<getUserPres.length;i++){
//                          let getId =getUserPres[i].userID;
//                         for(let j=0;j<userIDStorageUser.length;j++) {
//                             if(userIDStorageUser[j]==getId)
//                                 {
//                                     for(let z=0;z<getUserPres[i].presMedicine.length;z++)
//                                         {
//                                             finalUIDList.push(userIDStorageUser[j]);
//                                             finalTokenList.push(TokenStorageUser[j]);
//                                             finalPresNameList.push(getUserPres[i].presName);
//                                             finalMedNameList.push(getUserPres[i].presMedicine[z].name);
//                                             finalMedQtyList.push(getUserPres[i].presMedicine[z].qty);
//                                             finalMedMealTimeList.push(userPreNameStorage[i]);
//                                             finalPatientNameList.push(getUserPres[i].presMedicine[z].mealTiming);
//                                         }
//                                 }
//                         }
//                     }
//             }

//             if(dependActiveTokenHave && depenpreshave) {
//                     for(let i=0; i<getDependPres.length;i++){
//                         let getId =getDependPres[i].userID;
//                        for(let j=0;j<userIDStorageDepend.length;j++) {
//                            if(userIDStorageDepend[j]==getId)
//                                {
//                                    for(let z=0;z<getDependPres[i].presMedicine.length;z++)
//                                        {
//                                            finalUIDList.push(userIDStorageDepend[j]);
//                                            finalTokenList.push(userIDStorageDepend[j]);
//                                            finalPresNameList.push(getDependPres[i].presName);
//                                            finalMedNameList.push(getDependPres[i].presMedicine[z].name);
//                                            finalMedQtyList.push(getDependPres[i].presMedicine[z].qty);
//                                            finalMedMealTimeList.push(getDependPres[i].presMedicine[z].mealTiming);
//                                            finalMedMealTimeList.push(dependPreNameStorage[i]);
//                                        }
//                                }
//                        }
//                    }
//             }

//             let sendNotificationResults = [];

//             if(finalTokenList.length>0){
//                 //send push notifications to users devices
//                 for(let x=0;x<finalTokenList.length;x++)
//                 {
//                     const dataObject = {
//                        userID:finalUIDList[x],
//                        patient:finalPatientNameList[x],
//                        medname:finalMedNameList[x],
//                        presName:finalPresNameList[x],
//                        quantity:finalMedQtyList[x],
//                        mealTime:finalMedMealTimeList[x],

//                     }
//                     sendNotificationResults.push(NotificationFunctions.sendPushNotification(1, dataObject, finalTokenList[x]));
//                     console.log(sendNotificationResults[x]);
//                 }
//             }
            
//         };
//   } catch (error) {
//      console.log("not success");
//      return "not success";
//   }
// });

