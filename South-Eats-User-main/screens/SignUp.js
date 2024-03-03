import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import styles from "../assets/Style";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// SIGN UP SCREEN
export default function SignUp({ navigation }) {
    const [fcmToken, setFcmToken] = useState(null);
    const [values, setValues] = useState({
        name: "",
        email: "",
        city: "",
        pwd: "",
        pw2: "",

    });

    useEffect(() => {
        if (requestUserPermission()) {
            messaging().getToken().then(token => {
                setFcmToken(token);
            });
        }
    }, []);

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        return enabled;
    }

    function handleChanges(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })

    }

    function SignUp() {
        const { name, email, city, pwd, pwd2 } = values

        if (pwd == pwd2) {
            auth().createUserWithEmailAndPassword(email, pwd)
                .then((response) => {
                    firestore().collection("users").doc(response.user.uid).set({
                        name,
                        email,
                        city,
                        fcmToken,
                        uid: response.user.uid
                    })
                })
                .catch((error) => {
                    alert(error.message)
                })
        }
        else {
            alert("Passwords are different!")
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>

            <View style={{
                margin: 5,
                justifyContent: 'center',
                height: "100%"
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Sign Up</Text>

                <TextInput
                    style={styles.formInputContainer}
                    placeholder="Name"
                    onChangeText={text => handleChanges(text, "name")}
                />

                <TextInput
                    style={styles.formInputContainer}
                    placeholder="Email Address"
                    onChangeText={text => handleChanges(text, "email")}
                />

                <TextInput
                    style={styles.formInputContainer}
                    placeholder="City"
                    onChangeText={text => handleChanges(text, "city")}
                />

                <TextInput
                    style={styles.formInputContainer}
                    placeholder="Password"
                    onChangeText={text => handleChanges(text, "pwd")}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.formInputContainer}
                    placeholder="Confirm Password"
                    onChangeText={text => handleChanges(text, "pwd2")}
                    secureTextEntry={true}
                />

                <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'orange',
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            marginHorizontal: 10,
                            borderRadius: 30,
                        }}
                        onPress={() => SignUp()}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: "900"
                        }}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'orange',
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            marginHorizontal: 10,
                            borderRadius: 30,
                        }}
                        onPress={() => navigation.navigate("Login")}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: "900"
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}