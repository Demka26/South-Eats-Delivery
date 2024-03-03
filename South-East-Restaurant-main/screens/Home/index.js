import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Alert, View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/OrderItem';
import { auth, db } from '../../config/firebase';
import styles from './styles';

const orderCollection = db.collection("orders");

const Home = (props) => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const restaurant = useSelector(state => state.authReducer.restaurant);

    useEffect(() => {
        const unsubscribe = orderCollection
            .where("restaurantId", "==", restaurant.restaurantId)
            .onSnapshot((querySnapshot) => {
                const orders = []
                querySnapshot.forEach((doc) => {
                    orders.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
                setOrders(orders);
            });

        return unsubscribe;
    }, []);

    const handleOnAcceptOrder = async (orderId) => {
        try {
            await orderCollection.doc(orderId).update({
                status: "accepted"
            });

            Alert.alert("Order has been accepted successfully");
        } catch (error) {
            console.log(error);
            Alert.alert(error?.message);
        }
    }

    const handleOnCancelOrder = async (orderId) => {
        try {
            await orderCollection.doc(orderId).update({
                status: "cancelled"
            });

            Alert.alert("Order has been cancelled successfully");
        } catch (error) {
            console.log(error);
            Alert.alert(error?.message);
        }
    }

    const handleOnReadyOrder = async (orderId) => {
        try {
            await orderCollection.doc(orderId).update({
                status: "ready"
            });

            Alert.alert("Order is ready to be delivered");
        } catch (error) {
            console.log(error);
            Alert.alert(error?.message);
        }
    }


    const renderItem = ({ item }) => {
        return (
            <OrderItem
                item={item}
                onAcceptOrder={handleOnAcceptOrder}
                onCancelOrder={handleOnCancelOrder}
                onReadyOrder={handleOnReadyOrder}
            />
        )
    }

    const renderListItemSeparator = () => {
        return (
            <View style={styles.listItemSeparator} />
        )
    }

    const handleOnConfirmLogout = async () => {
        try {
            await auth.signOut();
            dispatch({
                type: "LOGOUT_RESTAURANT"
            });
        } catch (error) {
            console.log(error);
            Alert.alert(error?.message);
        }
    }


    const handleOnPressLogout = () => {
        Alert.alert(
            'Confirm Logout',
            "Are you sure you want to logout?",
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => handleOnConfirmLogout() },
            ],
            { cancelable: false }
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>Welcome to South Easts</Text>
                <TouchableOpacity style={styles.logoutContainer} onPress={handleOnPressLogout}>
                    <Image source={require("../../assets/logout.png")} style={styles.logoutIcon} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={orders}
                renderItem={renderItem}
                style={styles.listContainer}
                ItemSeparatorComponent={renderListItemSeparator}
                contentContainerStyle={styles.listContentContainer}
            />
        </SafeAreaView>
    )
}


export default Home;


