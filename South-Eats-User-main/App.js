import 'react-native-gesture-handler';
import React, { useEffect, } from "react";
import RootNavigation from "./navigation";
import messaging from '@react-native-firebase/messaging';
import { Provider as ReduxProvider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import configureStore from "./redux/store";

const store = configureStore();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const schedulePushNotification = async (remoteMessage) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        data: {
          data: remoteMessage.data
        },
      },
      trigger: {
        seconds: 1
      },
    });
  }

  useEffect(() => {
    //On tap notification
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      }
    }
    );

    //On Notification Open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    //On Notification Receive
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });


    //On Notification Receive
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await schedulePushNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <ReduxProvider store={store}>
      <RootNavigation />
    </ReduxProvider>
  );

}

export default App;