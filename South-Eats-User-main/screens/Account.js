import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const vw = Dimensions.get('window').width / 100;

const Account = (props) => {
    const currentUser = auth().currentUser;
    const [user, setUser] = useState(null);

    const getUserProfile = async () => {
        try {
            const response = await firestore().collection('users').doc(currentUser.uid).get();

            if (response.exists) {
                setUser(response.data());
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    const handleOnLogout = () => {
        auth().signOut()
            .then(() => {
                alert("You have been successfully logged out");
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const handleOnEdit = async () => {
        try {
            await firestore().collection('users').doc(currentUser.uid).update({
                ...user,
            })

            alert("Your profile has been updated");
        } catch (error) {
            alert(error.message);
        }
    }

    const handleOnChange = (text, key) => {
        setUser(prev => {
            return {
                ...prev,
                [key]: text
            }
        })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                howsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <Text style={styles.headerText}>Account</Text>
                <View style={styles.bodyContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.titleText}>Name</Text>
                        <TextInput
                            placeholder='Name'
                            value={user?.name}
                            style={styles.valueText}

                            onChangeText={(text) => handleOnChange(text, 'name')}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.titleText}>Email</Text>
                        <Text style={styles.valueText}>{user?.email}</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.titleText}>City</Text>
                        <TextInput
                            placeholder='City'
                            value={user?.city}
                            style={styles.valueText}
                            onChangeText={(text) => handleOnChange(text, 'city')}
                        />
                    </View>

                    <View style={styles.updateBtnContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={handleOnEdit}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.footerContent} onPress={handleOnLogout}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons
                                size={38}
                                name="logout"
                                color={"#000000"}
                            />
                        </View>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentContainer: {
        width: vw * 100,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 25,
        marginTop: 40,
        fontWeight: '500',
        textAlign: 'center',
    },
    bodyContainer: {
        width: '80%',
        marginVertical: 80,
    },
    inputContainer: {
        marginBottom: 20,
        borderBottomWidth: 3,
        borderBottomColor: '#FFA500',
    },
    titleText: {
        fontSize: 16,
        marginBottom: 8,
        color: "#756E6E",
    },
    valueText: {
        fontSize: 18,
        marginBottom: 6,
        fontWeight: '600',
    },
    updateBtnContainer: {
        marginTop: 40,
    },
    buttonContainer: {
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    footerContainer: {
        width: '85%',
        marginBottom: 50,
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFA500',
    },
    logoutText: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20,
    }
});