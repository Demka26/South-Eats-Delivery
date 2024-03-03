const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp()

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    try {
        const db = admin.firestore();
        const data = await db.collection("users").doc("mC86xOpGxdbTgPfdBKYT7yHdCi12").get();

        //send push notification using fcm 
        const payload = {
            notification: {
                title: "Hello World",
                body: "This is a notification from Firebase Cloud Messaging!",
                icon: "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
            }
        };

        const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        const result = await admin.messaging().sendToDevice(data.data().fcmToken, payload, options);
        console.log("Successfully sent message:", result);

        response.send("Hello from Firebase!");

    }
    catch (error) {
        response.send(error);
    }
});
