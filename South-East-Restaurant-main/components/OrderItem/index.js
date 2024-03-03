import React from 'react';
import { Text, View } from 'react-native';
import { getStatus } from '../../utils';
import TextButton from '../Buttons/TextButton';
import styles from './styles';

const OrderItem = (props) => {
    const { item, onAcceptOrder, onCancelOrder, onReadyOrder } = props;

    const handleOnAcceptOrder = () => {
        if (onAcceptOrder) {
            onAcceptOrder(item?.id)
        }
    }

    const handleOnCancelOrder = () => {
        if (onCancelOrder) {
            onCancelOrder(item?.id)
        }
    }

    const handleOnReadyOrder = () => {
        if (onReadyOrder) {
            onReadyOrder(item?.id)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.titleText}>Order Id - {item?.id?.substring(0, 4)}</Text>
                <View style={styles.orderStatusContainer}>
                    <Text style={styles.titleText}>Order Status - </Text>
                    <Text style={styles.orderStatusText}>{getStatus(item?.status)}</Text>
                </View>
            </View>
            <Text style={styles.customerNameText}>{item?.restaurantName}</Text>
            <View style={styles.bodyContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.titleText}>
                        {item?.name}
                    </Text>
                    <Text style={styles.titleText}>
                        Apartment: {item?.apartment}
                    </Text>
                    <Text style={styles.titleText}>
                        Floor {item?.floor}
                    </Text>
                    <Text style={styles.titleText}>
                        City: {item?.city}
                    </Text>
                    <Text style={styles.titleText}>
                        {item?.phone}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.itemTitleText}>Dishes:</Text>
                    {
                        item?.items?.map((item, index) => {
                            return (
                                <Text key={index} style={styles.boldText}>{item?.title}</Text>
                            )
                        })
                    }
                </View>
            </View>
            <View style={styles.footerContainer}>
                <TextButton
                    title="Accept"
                    onPress={handleOnAcceptOrder}
                    disabled={item?.status !== "placed"}
                />
                <TextButton
                    title="Ready"
                    onPress={handleOnReadyOrder}
                    style={styles.readyTextButton}
                    disabled={item?.status !== "accepted"}
                />
                <TextButton
                    title="Cancel Order"
                    textStyle={styles.cancelText}
                    onPress={handleOnCancelOrder}
                    style={styles.cancelTextButton}
                    disabled={item?.status !== "placed"}
                />
            </View>
        </View>
    )
}

export default OrderItem
