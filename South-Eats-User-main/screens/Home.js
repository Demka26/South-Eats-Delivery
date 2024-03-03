import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import RestaurantItems, { localRestaurants } from "../components/home/RestaurantItems";
import HeaderTabs from "../components/home/HeaderTabs";
import BottomTabs from "../components/home/BottomTabs";
import { Divider } from "react-native-elements";

// HOME SCREEN

const YELP_API_KEY = "fIQOwyvkzNUqvoZdpejJ06CBJr00RHCNCK4-Q7975yrJf_UvQbwwRtjG3dujRz7-GAnnPSAbYCE9VfabwD9kWgF5eou75Dlp4gw-wKfnbSy1_f8LDeUZS51hfdzzYnYx"

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San-Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl =
      `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };
    // get the yelp api data, pull the json data and return it. Will return an array.
    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((data) => {
        setRestaurantData(data.businesses.filter((businesses) => businesses.transactions.includes(activeTab.toLowerCase()))
        )
      }
      );

  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab])

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* <SearchBar cityHandler={setCity}/> */}
        {/* <TouchableOpacity 
            style={{
                backgroundColor: 'orange',
                paddingVertical: 10,
                paddingHorizontal: 16,
                marginHorizontal:10,
                borderRadius: 30,
               }}  
            onPress={()=>firebase.auth().signOut()}>
                <Text style={{
                    fontSize:15, 
                    fontWeight:"900"
                }}>Log out</Text>
            </TouchableOpacity> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Categories/> */}
        <RestaurantItems restaurantData={restaurantData} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}
