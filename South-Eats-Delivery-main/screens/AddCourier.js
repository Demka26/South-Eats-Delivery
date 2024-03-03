import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TouchableHighlight, TextInput, FlatList } from 'react-native';
import firebase from 'firebase/app';
import styles from "../assets/Style";
import { db } from '../config/firebase';

export default function AddCourier({ navigation, route }) {
    const [isActive, setIsActive] = useState(false);
    const auth = firebase.auth;
    const firestore = firebase.firestore;

    const [values, setValues] = useState({
        name: "",
        role: "",
        email: "",
        pwd: "",
        pw2: ""
    })

    function handleChanges(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })

    }

    function SignUp() {

        const { email, pwd, pwd2, name, role } = values

        if (pwd == pwd2) {
            auth().createUserWithEmailAndPassword(email, pwd)
                .then(() => {
                    firestore().collection("users").doc(auth().currentUser.uid).set({
                        uid: auth().currentUser.uid,
                        name,
                        role,
                        email
                    })
                    alert("Courier was added")

                })
                .catch((error) => {
                    alert(error.message)
                })
        }
        else {
            alert("Passwords are different!")
        }

    }

    const handleOnCompleteOrder = async () => {
        try {
            const { params } = route;

            await db.collection("forDelivery")
                .doc(params.id)
                .set({
                    apartment: params.apartment ? params.apartment : "",
                    floor: params.floor ? params.floor : "",
                    phone: params.phone ? params.phone : "",
                    city: params.city ? params.city : "",
                    createdAt: params.createdAt ? params.createdAt : "",
                    items: params.items ? params.items : [],
                    name: params.name ? params.name : "",
                    restaurantName: params.restaurantName ? params.restaurantName : "",
                    street: params.street ? params.street : "",
                });
            await db.collection("orders").doc(params?.id).delete().then(() => {
                console.log("Document successfully deleted!");
            });

        } catch (error) {
            console.error("Error removing document: ", error);
        }
        finally {
            navigation.navigate("Home");
        }
    }

    const onPressLearnMore = () => {
        setIsActive(true);
    }

    console.log("navigation, route", { params: route.params });

    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>

            {/* <View style={{
                margin:5,
                justifyContent: 'center',
                height: "100%"
            }}>
            <Text style={{
                fontSize:20,
                fontWeight: "bold"}}>Add new courier</Text>
        
        <TextInput 
            style={styles.formInputContainer} 
            placeholder="Full Name" 
            onChangeText={text=>handleChanges(text,"name")}
        />
        <TextInput 
            style={styles.formInputContainer} 
            placeholder="Email Address" 
            onChangeText={text=>handleChanges(text,"email")}
        />
        <TextInput 
            style={styles.formInputContainer} 
            placeholder="Courier" 
            onChangeText={text=>handleChanges(text,"role")}
        />
        <TextInput 
            style={styles.formInputContainer} 
            placeholder="Password" 
            onChangeText={text=>handleChanges(text,"pwd")} 
            secureTextEntry={true}
        />
         <TextInput 
            style={styles.formInputContainer} 
            placeholder="Confirm Password" 
            onChangeText={text=>handleChanges(text,"pwd2")} 
            secureTextEntry={true}
        />
        <View style={{flexDirection:"row", alignSelf:"center", marginTop:10}}>
            <TouchableOpacity 
            style={{
                backgroundColor: 'orange',
                paddingVertical: 10,
                paddingHorizontal: 16,
                marginHorizontal:10,
                borderRadius: 30,
               }}  
            onPress={()=>SignUp()}>
                <Text style={{
                    fontSize:15, 
                    fontWeight:"900"
                }}>Add</Text>
            </TouchableOpacity>
           
        </View>
        </View> */}

            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.innerContainer}>
                    <Text style={styles.itemHeading}>{route.params?.restaurantName}</Text>
                    <Text style={styles.itemHeading}>{route.params?.name}</Text>
                    <View style={{ margin: 4, padding: 10 }}>
                        <Text style={styles.itemHeading}>{route.params?.street}</Text>
                        <Text style={styles.itemHeading}>Apartmet: {route.params?.apartment}</Text>
                        <Text style={styles.itemHeading}>floor: {route.params?.floor}</Text>
                        <Text style={styles.itemHeading}>City: {route.params?.city}</Text>

                    </View>
                    <Text style={{ marginBottom: 10 }}>{route.params?.phone}</Text>

                    {/* {item.items.map((item,index)=>(
                        <Text key={index} item={item}>{item.title}</Text>
                       ))} */}

                </View>
                <View style={{ flexDirection: 'row', alignSelf: "center", marginTop: 20 }}>

                    <TouchableHighlight
                        style={{
                            flex: 1,
                            backgroundColor: 'orange',
                            borderWidth: 2,
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            marginHorizontal: 10,
                            borderRadius: 10,
                        }}
                        onPress={handleOnCompleteOrder}
                    >
                        <Text style={{ alignSelf: 'center', color: 'black' }}>click here to finish</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}