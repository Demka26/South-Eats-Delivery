import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const OrderItem = (props) => {
    const { item, buttonTitle, buttonStyle, onPress, disabled = false } = props

    const handleOnPress = () => {
        if (onPress) {
            onPress(item)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>{item?.restaurantName}</Text>
                <Text style={styles.itemHeading}>{item?.name}</Text>
                <View style={{ margin: 4, padding: 10 }}>
                    <Text style={styles.itemHeading}>Street: {item?.street}</Text>
                    <Text style={styles.itemHeading}>Apartmet: {item?.apartment}</Text>
                    <Text style={styles.itemHeading}>Floor: {item?.floor}</Text>
                    <Text style={styles.itemHeading}>City: {item?.city}</Text>
                </View>
                <Text style={{ marginBottom: 10 }}>{item?.phone}</Text>

                {item?.items && item.items?.map((data, index) => (
                    <Text key={index}>{data?.title}</Text>
                ))}
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={[styles.buttonStyle, buttonStyle]} onPress={handleOnPress} disabled={disabled} >
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>{buttonTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderItem


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        padding: 15,
        broderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        borderRadius: 5
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
    footerContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignSelf: "center",
    },
    buttonStyle: {
        flex: 1,
        height: 35,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#75C568',
    }

});