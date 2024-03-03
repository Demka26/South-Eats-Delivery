import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from "react-redux";

// MENU ITEMS COMPONNET
const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  }
});


// function that adds the food to the cart and updates the value in the cartReducer
export default function MenuItems({ restaurantName, restaurantId, foods, hideCheckbox, marginLeft }) {
  const dispatch = useDispatch();

  const selectItem = (item, checkboxValue) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantId: restaurantId,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });
  }

  // keeps the current satte of the cart
  const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);

  // checks if there is selected food in the cart
  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title == food.title));


  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
              />
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          <Divider width={0.5} orientation="vertical" style={{ marginHorizontal: 20 }} />
        </View>

      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>

);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft
      }}
    />
  </View>
);