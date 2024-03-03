import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderItem from '../components/OrderItem';
import { db } from '../config/firebase';

const vh = Dimensions.get('window').height * 0.01;

const DeliveredOrders = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        db.collection('orders')
            .where("status", 'in', ["delivered", "cancelled", 'inprogress'])
            .onSnapshot(
                querySnapshot => {
                    const orders = []
                    querySnapshot.forEach((doc) => {
                        const { apartment, floor, phone, city, createdAt, items, name, restaurantName, street, status } = doc.data()

                        orders.push({
                            id: doc.id, apartment, floor, phone, city, createdAt, items, name, restaurantName, street, status
                        })
                    });



                    // setOrders(orders.sort((a, b) => {
                    //     if (a.status > b.status) return -1;
                    //     if (a.status < b.status) return 1;
                    //     return 0;
                    // }));
                    setOrders(orders);
                }
            )
    }, []);

    const handleOnDelivered = async (item) => {
        try {
            await db.collection("orders").doc(item.id).update({
                status: "delivered"
            });

            Alert.alert("Order has bee successfully completed");
        } catch (error) {
            console.log(error);
            Alert.alert(error?.message);
        }
    }

    const getButtonTitle = (status) => {
        switch (status) {
            case "delivered":
                return "Completed";
            case "cancelled":
                return "Cancelled";
            case "inprogress":
                return "Delivered";
            default:
                return "Delivered";
        }
    }

    const renderListItem = ({ item }) => {
        return (
            <OrderItem
                item={item}
                disabled={item.status === "delivered" || item.status === "cancelled"}
                buttonTitle={getButtonTitle(item.status)}
                onPress={handleOnDelivered}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Delivery in progress</Text>
            <View style={styles.contentContainer}>
                <FlatList
                    data={orders}
                    style={styles.listContainer}
                    renderItem={renderListItem}
                />
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.backButtonText}>Back to Orders</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeliveredOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: "900",
        alignSelf: 'center'
    },
    contentContainer: {
        marginBottom: 40
    },
    listContainer: {
        height: vh * 88
    },
    backButtonContainer: {
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F8C30B",
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: "500"
    }
})