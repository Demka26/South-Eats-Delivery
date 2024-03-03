import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DeliveredOrders from './screens/DeliveredOrders';
import AddCourier from './screens/AddCourier';
import Login from './screens/Login';
import Home from "./screens/Home";
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();


const RootNavigation = () => {
  const user = useSelector(state => state.userReducer.user);
  const screenOptions = {
    headerShown: false,
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {
          user ?
            <>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='AddCourier' component={AddCourier} />
              <Stack.Screen name='DeliveredOrders' component={DeliveredOrders} />
            </>
            :
            <Stack.Screen name='Login' component={Login} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation
