import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { StyleSheet } from 'react-native';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';

// VIEW CART COMPONENT
export default function ViewCart({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = useSelector(state => state.authReducer.user);
    const { items, restaurantName, restaurantId, } = useSelector((state) => state.cartReducer.selectedItems);

    //total with the shekel sign
    const total = items
        .map((item) => Number(item.price.replace('₪', "")))
        .reduce((prev, curr) => prev + curr, 0);

    const totalILS = total.toLocaleString("en", {
        style: "currency",
        currency: "ILS",
    });

    // adds the order to "orders" table in firebase
    const addOrderToFireBase = () => {
        setLoading(true);

        const db = firestore();
        db.collection("orders")
            .add({
                items: items,
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                createdAt: firestore.FieldValue.serverTimestamp(),
                userId: user.uid,
                status: "placed",
            }).then((snapshot) => {
                setTimeout(() => {
                    setLoading(false);
                    navigation.navigate("Payment", {
                        orderId: snapshot.id,
                    });
                }, 2500);
            });
    }

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
        },
        modalCheckoutContainer: {
            backgroundColor: "white",
            padding: 16,
            height: 500,
            borderWidth: 1,
        },

        restaurantName: {
            textAlign: 'center',
            fontWeight: "600",
            fontSize: 18,
            marginBottom: 10,
        },

        subtotalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
        },

        subtotalText: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
        },

    });

    const checkoutModalContent = () => {
        return (
            <>
                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.restaurantName}>{restaurantName}</Text>
                        {items.map((item, index) => (
                            <OrderItem key={index} item={item} />
                        ))}
                        <View style={styles.subtotalContainer}>
                            <Text style={styles.subtotalText}>Subtotal</Text>
                            <Text>{totalILS}₪</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity style={{
                                marginTop: 20,
                                backgroundColor: "black",
                                alignItems: "center",
                                padding: 13,
                                borderRadius: 30,
                                width: 300,
                                position: "relative",

                            }}
                                onPress={() => {
                                    addOrderToFireBase();
                                    setModalVisible(false);

                                }}
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                                <Text style={{
                                    color: "white",
                                    position: "absolute",
                                    right: 20,
                                    fontSize: 15,
                                    top: 17
                                }}>
                                    {total ? totalILS : ""}₪
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        );
    };

    return (
        <>
            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                {checkoutModalContent()}
            </Modal>
            {total ? (
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 130,
                    zIndex: 999,

                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%"

                    }}>
                        <TouchableOpacity style={{
                            marginTop: 20,
                            backgroundColor: 'black',
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            //alignItems: 'center',
                            padding: 15,
                            borderRadius: 30,
                            width: 300,
                            position: "relative",
                        }}
                            onPress={() => setModalVisible(true)}>
                            <Text style={{ color: 'white', fontSize: 20, marginRight: 40 }}>View Cart</Text>
                            <Text style={{ color: "white", fontSize: 20 }}>{totalILS} ₪ </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <></>
            )}
            {loading ? <View style={{
                backgroundColor: 'black',
                position: 'absolute',
                opacity: 0.6,
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                height: "100%"
            }}><LottieView
                    style={{ height: 200 }}
                    source={require('../../assets/animations/scanner.json')}
                    autoPlay
                    speed={3}
                /></View> : <></>}
        </>
    );
}