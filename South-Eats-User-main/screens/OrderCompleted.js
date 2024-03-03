import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from "lottie-react-native";
import MenuItems from '../components/restaurantDetail/MenuItems';
import { ScrollView } from 'react-native-gesture-handler';
import TextButton from "../components/Payment/TextButton";
import { FONTS, SIZES, COLORS } from "../constants/theme";
import firestore from '@react-native-firebase/firestore';
import styles from "../assets/Style";
import Home from '../screens/Home';

// ORDER COMPLETED SCREEN
export default function OrderCompleted({ navigation }) {
    const [lastOrder, setLastOrder] = useState({
        items: [
            {
                title: "Lasagna",
                description: "Lasagna is a dish of Italian origin, consisting of a layer of pasta with a sauce made of tomatoes, cheese, and meat. It is traditionally topped with a selection of cheese.",
                price: "13.50$",
                image:
                    "https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Lasagna-550.jpg"
            },
        ]
    })
    const { items, restaurantName } = useSelector(
        (state) => state.cartReducer.selectedItems
    );

    const total = items
        .map((item) => Number(item.price.replace('₪', "")))
        .reduce((prev, curr) => prev + curr, 0);

    const totalILS = total.toLocaleString("en", {
        style: "currency",
        currency: "ILS",
    });

    useEffect(() => {
        const db = firestore();
        const unsubscribe = db.collection("orders")
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                    setLastOrder(doc.data());
                });
            });
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{
                margin: 15,
                alignItems: 'center',
                height: "100%"
            }}
            >
                <LottieView
                    style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
                    source={require('../assets/animations/check-mark.json')}
                    autoPlay
                    speed={0.5}
                    loop={false}
                />
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Your order at {restaurantName} has been placed for {totalILS}</Text>
                <ScrollView>
                    <MenuItems foods={lastOrder.items} hideCheckbox={true} marginLeft={10} />
                    <LottieView
                        style={{ height: 200, alignSelf: "center" }}
                        source={require("../assets/animations/cooking.json")}
                        autoPlay
                        speed={0.5}
                    />
                    <View style={{ marginTop: 10 }}>
                        <TextButton
                            label="Home"
                            buttonContainerStyle={{
                                height: 55,
                                marginBottom: SIZES.padding,
                                borderRadius: SIZES.radius,

                            }}
                            onPress={() => navigation.navigate("Home")}
                        />
                    </View>

                </ScrollView>
            </View>

        </SafeAreaView>
    )
}