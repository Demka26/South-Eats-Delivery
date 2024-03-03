import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderItem from '../components/OrderItem';
import { db, auth } from '../config/firebase';
import { getStatus, sendPushNotification } from '../utils';

const vh = Dimensions.get('window').height * 0.01;

export default function Home() {
    const [filterText, setFilterText] = useState('');
    const navigation = useNavigation();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        db.collection('orders')
            .where("status", "==", "ready")
            .onSnapshot(
                querySnapshot => {
                    const orders = []
                    querySnapshot.forEach((doc) => {
                        const { createdAt, items, restaurantName, name, street, apartment, floor, city, phone, status, userId } = doc.data()
                        orders.push({
                            id: doc.id,
                            createdAt,
                            items,
                            restaurantName,
                            name,
                            street,
                            apartment,
                            floor,
                            city,
                            phone,
                            status: getStatus(status),
                            userId
                        })
                    })

                    setOrders(orders)
                }
            )
    }, [])

    const handleOnStartDelivery = async (item) => {
        try {
            await db.collection("orders").doc(item.id).update({
                status: "inprogress"
            });

            Alert.alert("Order delivery has been started");

            sendPushNotification({
                userId: item.userId,
                title: "Your order is on the way.",
                body: `Your order from ${item.restaurantName} is on the way.`
            });

        } catch (error) {
            console.log(error);
            Alert.alert(error?.message);
        }
    }

    const renderItem = ({ item }) => {
        return (
            <OrderItem
                item={item}
                buttonTitle="Start Delivery"
                buttonStyle={styles.buttonStyle}
                onPress={handleOnStartDelivery}
            />
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View>
                <Text style={{
                    fontSize: 15,
                    fontWeight: "900",
                    alignSelf: 'center'
                }}>Orders</Text>

                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>Filter by Restaurant Name</Text>
                    <TextInput
                        value={filterText}
                        placeholder='Restaurant Name'
                        style={styles.filterInput}
                        onChangeText={setFilterText}
                    />
                </View>

                <View style={styles.listContainer}>
                    <FlatList
                        style={{ height: vh * 88 }}
                        data={orders.filter((order => order.restaurantName.toLowerCase().includes(filterText.toLowerCase())))}
                        renderItem={renderItem}
                    />
                    <TouchableOpacity
                        style={{
                            height: 50,
                            marginTop: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#75C568',
                        }}
                        onPress={() => navigation.navigate("DeliveredOrders")}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "500"
                        }}>Let's Start</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        broderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    itemHeading: {
        fontWeight: 'bold'
    },
    itemText: {
        fontWeight: '300'
    },
    buttonStyle: {
        backgroundColor: '#ECC846',
    },
    filterContainer: {
        backgroundColor: '#e5e5e5',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        paddingVertical: 12,
        marginHorizontal: 10,
        borderRadius: 5
    },
    filterTitle: {
        width: "90%",
        marginBottom: 10
    },
    filterInput: {
        height: 35,
        width: "90%",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white",
        textAlignVertical: 'center',
        paddingHorizontal: 10
    },
    listContainer: {
        height: vh * 80,
    }
})