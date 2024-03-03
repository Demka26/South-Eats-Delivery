import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../../config/firebase';
import styles from "../../assets/Style";
import { useDispatch } from 'react-redux';

// LOGIN SCREEN
const LoginScreen = ({ navigation }) => {
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

    const Login = async () => {
        try {
            const { email, pwd } = values
            const loginResponse = await auth.signInWithEmailAndPassword(email, pwd);
            const response = await db.collection("restaurants").doc(loginResponse.user.uid).get();

            if (response.exists && response.data()) {
                dispatch({
                    type: "LOGIN_RESTAURANT",
                    payload: {
                        restaurant: response.data()
                    }
                })

                alert("Login Successful");
            }

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#eee",
        }}>
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
                        onPress={() => Login()}>
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
                        }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: "900"
                        }}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}

export default LoginScreen;

