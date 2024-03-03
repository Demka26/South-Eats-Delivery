import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import styles from "../assets/Style";

// LOGIN SCREEN
export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [fcmToken, setFcmToken] = useState(null);
    const [values, setValues] = useState({
        email: "",
        pwd: ""
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

    // if the values changes 
    function handleChanges(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })

    }

    async function Login() {
        try {
            const { email, pwd } = values;
            const response = await auth().signInWithEmailAndPassword(email, pwd);
            const userRef = firestore().collection('users').doc(response.user.uid);

            const userData = await userRef.get();
            await userRef.update({
                fcmToken: fcmToken
            });

            dispatch({
                type: "LOGIN_USER",
                payload: {
                    user: userData.data()
                }
            });
            alert("You have been successfully logged in");

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>

            <View style={{
                margin: 5,
                justifyContent: 'center',
                height: "100%"
            }}>
                {/* <View   style={{ 
                alignSelf: 'center'}}>

                <Image source={require('../assets/images/southeats copy.JPG')} style={{width: 200, height: 200}} />
            </View> */}
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
                        }}
                        onPress={() => navigation.navigate("SignUp")}>
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