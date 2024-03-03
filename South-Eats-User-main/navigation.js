import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RestaurantDetail from './screens/RestaurantDetail';
import OrderCompleted from './screens/OrderCompleted';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import Account from './screens/Account';
import Payment from './screens/Payment';
import Orders from './screens/Orders';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from "./screens/Home";
import Splash from "./screens/Splash";

const Stack = createStackNavigator();

export default function RootNavigation() {
  const user = useSelector(state => state.authReducer.user);
  // const [isLogged, setIsLoggedIn] = React.useState(false);

  const screenOptions = {
    headerShown: false,
  }

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user != null) {
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  //   });
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {
          user ? (
            <>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='RestaurantDetail' component={RestaurantDetail} />
              <Stack.Screen name='OrderCompleted' component={OrderCompleted} />
              <Stack.Screen name='Payment' component={Payment} />
              <Stack.Screen name='Orders' component={Orders} />
              <Stack.Screen name='Account' component={Account} />
            </>
          ) : (
            <>
            
              <Stack.Screen name='Splash' component={Splash} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='SignUp' component={SignUp} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}