import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { auth, db } from '../config/firebase';
import styles from "../assets/Style";

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        pwd: ""
    })

    function handleChanges(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    const handleOnLogin = async () => {
        try {
            const { email, pwd } = values
            const response = await auth.signInWithEmailAndPassword(email, pwd);
            const snapshot = await db.collection("users").doc(response.user.uid).get();

            if (snapshot.exists) {
                const user = snapshot.data();

                if (user.role === "rider") {
                    dispatch({
                        type: "LOGIN_USER",
                        payload: {
                            user: user
                        }
                    });
                }
            }

        } catch (error) {
            alert(error.message)
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
                }}>Login</Text>

                <TextInput
                    style={styles.formInputContainer}
                    placeholder="Email Address"
                    onChangeText={text => handleChanges(text, "email")}
                />
                <TextInput
                    style={styles.formInputContainer}
                    placeholder="Password"
                    onChangeText={text => handleChanges(text, "pwd")}
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
                        onPress={handleOnLogin}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: "900"
                        }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'orange',
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            marginHorizontal: 10,
                            borderRadius: 30,
                        }}
                        onPress={() => navigation.navigate("Home")}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: "900"
                        }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}