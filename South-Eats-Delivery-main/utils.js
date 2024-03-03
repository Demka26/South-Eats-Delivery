import { db } from "./config/firebase";
const FCM_SERVER_KEY = "AAAAs4LjiDw:APA91bF3owfj8yjxY_1FvK_gpZwyIZuM3EJ7DzXILIMCbWkfL5VKJbfSEziyTMwcj0Ju7SdSouO_rTXhIkuhCXHXsCf2RiIZvAsx3rDkZLezyisGIJ4NfWIXC3TLeY_F70uwitSLC7rs";

export const getStatus = (status) => {
    switch (status) {
        case 'ready':
            return 'Pending';
        case 'inprogress':
            return 'In Progress';
        case 'delivered':
            return 'Delivered';
        default:
            return 'Unknown';
    }
}
// send push notifcation to user using fcm push notification
export const sendPushNotification = async ({ userId, title, body }) => {

    try {
        const user = await db.collection('users').doc(userId).get();
        const token = user.data().fcmToken;

        if (token) {
            const payload = {
                sound: 'default',
                priority: "high",
                notification: {
                    title,
                    body
                },
                apns: {
                    headers: {
                        "apns-priority": "10"
                    }
                },
                "content_available": true,
                data: {
                    "type": "order",
                },
                to: token,
            };
            await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    Authorization: `key=${FCM_SERVER_KEY}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        }
    } catch (error) {
        console.log(error);
    }
}