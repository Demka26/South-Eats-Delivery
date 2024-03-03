import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// RESTAURANT ITEMS COMPONENT
export const localRestaurants = [
  {
    name: "Farmhouse Chinese kitchen",
    image_url: "https://c.files.bbci.co.uk/141EE/production/_110541428_chinesefood.jpg",
    categories: ["Chinese", "Fast Food"],
    price: "$$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Pizza Palace",
    image_url: "https://realfood.tesco.com/media/images/1400x919-MargaritaPizza-555a4065-2573-4b41-bcf3-7193cd095d8f-0-1400x919.jpg",
    categories: ["Italian", "Fast Food"],
    price: "$",
    reviews: 933,
    rating: 4.7,
  },
  {
    name: "Thai-Thai",
    image_url: "https://koh-samui-luxury-villa.com/wp-content/uploads/2020/07/Thai-Food.jpg",
    categories: ["Thai", "Restaurant"],
    price: "$$",
    reviews: 406,
    rating: 4.1,
  },
]

export default function RestaurantItems({ navigation, ...props }) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => {
        console.log("restaurant", restaurant);
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            style={{ marginBottom: 30 }}
            onPress={() => navigation.navigate("RestaurantDetail", {
              id: restaurant.id,
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
            }
          >
            <View
              style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
            >
              {/* restaurant.image_url */}
              <RestaurantImage image={restaurant.image_url} />
              <RestaurantInfo
                name={restaurant.name}
                rating={restaurant.rating} />
            </View>
          </TouchableOpacity>
        )
      })}
    </>
  );

}

const RestaurantImage = (props) => (
  <>
    <Image source={{
      uri: props.image,
    }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View style={{
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 10,
  }}>
    <View>
      <Text style={{
        fontSize: 15,
        fontWeight: "bold",
      }}>{props.name}
      </Text>
      <Text style={{
        fontSize: 13,
        color: "gray"
      }}>30-45 • min</Text>
    </View>
    <View style={{
      backgroundColor: "#eee",
      height: 30,
      width: 30,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
    }}>
      <Text>{props.rating}</Text>
    </View>
  </View>

)