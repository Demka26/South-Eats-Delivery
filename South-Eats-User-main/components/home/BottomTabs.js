import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Orders from '../../screens/Orders';

// BOTTOM TAB COMPONENT
export default function BottomTabs({ navigation }) {
    return (
        <View
            style={{
                flexDirection: "row",
                margin: 10,
                marginHorizontal: 30,
                justifyContent: "space-between"
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icon icon="home" text="Home" />
            </TouchableOpacity>

            {/* <Icon icon="search" text="Search" />
            <Icon icon="shopping-bag" text="Grocery" /> */}
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <Icon icon="receipt" text="Orders" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <Icon icon="user" text="Account" />
            </TouchableOpacity>
        </View>
    )
}

const Icon = (props) => (

    <View>
        <FontAwesome5
            name={props.icon}
            size={25}
            style={{
                marginBottom: 3,
                alignSelf: "center"
            }}
        // onPress={onPress}
        />
        <Text>{props.text}</Text>
    </View>

);

