import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const TextButton = (props) => {
    const handleOnPress = () => {
        if (props.onPress) {
            props.onPress()
        }
    }

    return (
        <TouchableOpacity
            {...props}
            style={[styles.container, props?.style]}
            onPress={handleOnPress}
        >
            <Text style={[styles.titleText, props?.textStyle]}>{props?.title}</Text>
        </TouchableOpacity>
    )
}

export default TextButton