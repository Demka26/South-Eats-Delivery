import React from "react";
import {TouchableOpacity,Text,View}from "react-native";
import { FONTS } from "../../constants/theme";
import { COLORS } from "../../constants/theme";

// TEXT BUTTON COMPONENT
const TextButton=({
    buttonContainerStyle,
    label,
    labelStyle,
    label2= "",
    label2Style,
    onPress,
    disabled
})=>{
    return(
        <TouchableOpacity style={{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: COLORS.primary,
            ...buttonContainerStyle
        }}
        onPress={onPress}
        >
            <Text style={{
                color: COLORS.white,
                ...FONTS.h3,
                ...labelStyle
            }}>
                {label}

            </Text>
            {label2 !=""&&
            <Text style={{
                flex:1,
                textAlign:'right',
                color:COLORS.white,
                ...FONTS.h3,
                ...label2Style
            }}
            >
            {label2}
            $</Text>
            }

        </TouchableOpacity>
    )
}
export default TextButton;