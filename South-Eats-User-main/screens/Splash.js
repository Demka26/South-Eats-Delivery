import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet,Image ,Button} from "react-native";
import RestaurantItems, { localRestaurants } from "../components/home/RestaurantItems";
import HeaderTabs from "../components/home/HeaderTabs";
import BottomTabs from "../components/home/BottomTabs";
import { Divider } from "react-native-elements";
import TextButton from "../components/Payment/TextButton";
import { COLORS, FONTS, SIZES } from "../constants";


// HOME SCREEN



export default function Splash({ navigation }) {


  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
         <View style={styles.container}>

        <Image
          source={require('../assets/splash.png')}
          style={styles.image}
        />
        <TextButton
          label="Let's Get Started"
          buttonContainerStyle={{
            height: 55,
            marginBottom: SIZES.padding,
            borderRadius: SIZES.radius,
            
          }}
          onPress={navigation.navigate('Login')}
        />
      </View>
     
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#000',
      alignItems: 'center',
      width: '100%',
    },
    h1: {
      color: '#008F68',
      fontSize: 40,
    },
    h2: {
      color: '#FAE042',
      fontSize: 18,
      marginTop: 8,
    },
    image: {
        width: 300,
        height: 260,
        justifyContent: 'center',
      },
      buttonContainer: {
        backgroundColor: '#008F68',
        borderRadius: 5,
        padding: 8,
        margin: 8,
      },
  });