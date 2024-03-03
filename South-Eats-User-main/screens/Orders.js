import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuItems from '../components/restaurantDetail/MenuItems';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { getOrderStatus } from '../utils';

export default function Orders() {
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


  console.log("lastOrderlastOrderlastOrder", lastOrder);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Your last order</Text>
      </View>
      <ScrollView>
        <MenuItems foods={lastOrder.items} hideCheckbox={true} marginLeft={10} />

        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{
            getOrderStatus(lastOrder.status)
          }</Text>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}