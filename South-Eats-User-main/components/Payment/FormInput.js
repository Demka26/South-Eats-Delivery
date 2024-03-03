import React from "react";
import {
    View,
    Text,
    TextInput,

} from 'react-native';

import { FONTS } from "../../constants/theme";
import { COLORS } from "../../constants/theme";
import styles from "../../assets/Style";

//FORM INPUT COMPONENT

const FormInput=({
    containerStyle,
    inputContainerStyle,
    label,
    placeholder,
    inputStyle,
    value="",
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType="default",
    autoComplete="off",
    autoCapitalize="none",
    errorMsg="",
    maxLength
})=>{
    return(
        <View style={{...containerStyle}}>
            <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:COLORS.gray,...FONTS.body4}}>{label}</Text>
                <Text style={{color:COLORS.red,...FONTS.body4}}>{errorMsg}</Text>
            </View>
            <View
                style={styles.formInputContainer}>
                {
                    prependComponent
                }
                <TextInput
                    style={{flex:1,...inputStyle}}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoComplete={autoComplete}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChangeText={(text)=>onChange(text)}
                />
                {
                    appendComponent
                }

            </View>

        </View>

    )
}


export default FormInput;