import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';

// RESTAURANT DETAIL SCREEN
const foods = [
  {
    title: "Spicy Tan Tan Ramen",
    description: "Spicy Ramen with Creamy Chicken. Tantan Chicken, bean sprouts, green onion,  seasoned boiled egg, and arugula.",
    price: "67₪",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130,g_auto/hoztvryqok5wgzoxh3qp"
  },
  {
    title: "Hakata Tonkotsu DX",
    description: "Hakata style ramen with rich beef broth. Regular toppings.",
    price: "64₪",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130,g_auto/zjxpyekkfy4w6nthqqbj"
  },
  {
    title: "Vegetable Ramen",
    description: "Creamy vegetable broth with spinach noodles ,Tofu mizuna green, cherry tomato, red and yellow bell pepper, red onion, seasoned soft boiled egg.",
    price: "56₪",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130,g_auto/pvafegveygvados1jhs6"
  },
  {
    title: "Gyoza",
    description: "Pan-fried chicken potstickers",
    price: "42₪",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130,g_auto/jlvgc3wqx92pkxlm1n1e"
  },
  {
    title: "Marufuku salad",
    description: "Olive oil, lemon juice, persian cucumbers, minced onion, cherry tomatoes.",
    price: "34₪",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130,g_auto/n7pw3j5xk6ktwy332cdh"
  },
  {
    title: "Kakunki bowl",
    description: "Braised Thick Pork Belly Over Rice Green onion, sesame seeds, kaiware sprout, pickled ginger and nori seaweed.",
    price: "47₪",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130,g_auto/v9bn1fcnhskrargmo4ur"
  },
  {
    title: "Karaage Bowl",
    description: "Olive oil, lemon juice, persian cucumbers, minced onion, cherry tomatoes.",
    price: "45₪",
    image:
      "https://images.rest.co.il/Customers/80114877/be17d85cd93a40b7b7fadc23cccf7cd5.jpg"
  },
];

const foods2 = [
  {
    title: "French Toast",
    description: "French bread with egg and maple.",
    price: "44₪",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/1EUm-2dgOSW14wQftsSWSg/o.jpg"
  },
  {
    title: "Margherita Pizza",
    description: "Made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.  ",
    price: "50₪",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/F-AXI3O81MEK_xXnc_GW5w/258s.jpg"
  },
  {
    title: "Fish and Chips",
    description: "Fried local fresh fish served with fried chips.",
    price: "56₪",
    image:
      "https://images.rest.co.il/Customers/80114877/b9a5592548b34b598370e4390a347aaf.jpg"
  },
  {
    title: "Caesar",
    description: "Red wine vineger, dijon mustard, romaine lettuce.",
    price: "47₪",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/bX9fZNUtGqmZk9pJ_gzucw/258s.jpg"
  },
  {
    title: "Loco Moco",
    description: "Loco Moco burger with fried egg, rice, and gravy.",
    price: "73₪",
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/EPmbi-5HP3A28pAxY5m9-w/258s.jpg"
  },
];

export default function RestaurantDetail({ route, navigation }) {
  const { name, id } = route.params;

  return (
    
    <View>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <View style={{
        height: 500,
      }}>
        <MenuItems restaurantId={id} restaurantName={name} foods={name == "Starbelly" ? foods2 : foods} />
      </View>

      <ViewCart navigation={navigation} />
      </View>
      
    
  
  )
}