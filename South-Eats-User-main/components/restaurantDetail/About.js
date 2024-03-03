import { View, Text } from 'react-native'
import React from 'react';
import { Image } from 'react-native-elements';

// ABOUT COMPONENT
export const localRestaurants = [
  {
    name: "Scobar",
    image_url: "https://images.rest.co.il/Customers/80114877/87d0199cd43d40b897da99c33df8105b.jpg",
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



export default function About(props) {
  const {name,image,price,reviews,rating,categories} = 
    props.route.params; // this is how the information is being passed around

  const formMattedCategories = categories.map((cat)=>cat.title).join(" • ");

  const description = `${formMattedCategories} ${price ?  " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;
  return (
    <View>
      {/* image */}
     <RestaurantImage image={image}/>
     <RestaurantName name={name}/>
     <RestaurantDescription description={description}/>
    </View>
  )
}

const RestaurantImage = (props) => (
  <Image source={{uri:props.image}} style={{width: '100%', height: 180}} />
);

const RestaurantName = (props) => (
    <Text style={{
      fontSize: 29,
      fontWeight: '600',
      marginTop: 10,
      marginHorizontal: 15,
    }}
    >
      {props.name}</Text>
  );

const RestaurantDescription = (props) => (
  <Text style={{
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: '400',
    fontSize: 15.5,
  }}
  >
    {props.description}</Text>
)