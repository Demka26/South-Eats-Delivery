import { View, Text } from 'react-native'
import React from 'react'


// ORDER ITEM COMPONENT
export default function ({item}) {
    const {title,price}= item;
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#999"
    }}>
      <Text style={{ fontWeight: "600", fontSize: 16}}>{title}</Text>
      <Text style={{ opacity: 0.7, fontSize: 16}}>{price}</Text>

    </View>
  )
}