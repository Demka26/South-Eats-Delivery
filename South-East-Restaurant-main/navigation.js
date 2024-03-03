import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { auth, db } from './config/firebase';
import Login from './screens/Login';
import Home from "./screens/Home";
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const RootNavigation = () => {
    const restaurant = useSelector(state => state.authReducer.restaurant);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {restaurant ?
                    <Stack.Screen name='Home' component={Home} initialParams={{ restaurant }} />
                    :
                    <Stack.Screen name='Login' component={Login} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;