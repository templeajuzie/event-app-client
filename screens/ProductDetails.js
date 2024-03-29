import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  Button,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import HTML from "react-native-render-html";
import Svg, { Path } from "react-native-svg";
import globalstyels from "../styles/globalstyels";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { UseUserContext } from "../context/UserContext";
import { UseProductProvider } from "../context/ProductProvider";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import { useWindowDimensions } from "react-native";



const ProductDetails = () => {
 
  const route = useRoute();
 const {width, height}= useWindowDimensions()
  const { title, price, description, thumbnail, productId, images } = route.params;
  const { authToken, setIsSignUpVisible, UserData } = UseUserContext();
  const { handleWishAdd, handleAddToCart, handleCartLoading } =
    UseProductProvider();
  
  const [selectedImage, setSelectedImage] = useState(thumbnail);
   
 

   const gallery = [
     thumbnail,
    ...images
  ];

   const handleThumbnailClick = (index) => {
     setSelectedImage(gallery[index]);
   };

  // function notifyMessage(msg: string) {
  //   if (Platform.OS === "android") {
  //     ToastAndroid.show(msg, ToastAndroid.SHORT);
  //   } else {
  //     AlertIOS.alert(msg);
  //   }
  // }

  const showAddToCartToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Item added to cart",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, width: width }}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <ScrollView style={{ ...styles.container, width: width }}>
        <View style={{ width: width }}>
          <View className={`mb-20  `}>
            {/* images begin */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Large Image */}
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: width,
                  resizeMode: "cover",
                  marginBottom: 10,
                  aspectRatio: 1,
                }}
              />

              {/* Thumbnails */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {gallery.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleThumbnailClick(index)}
                    style={{
                      marginHorizontal: 5,
                    }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: width > 500 ? 100 : 50,
                        height: width > 500 ? 100 : 50,
                        resizeMode: "cover",
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* images end */}

            {/* <View style={{width:width}} className="flex flex-row items-center justify-center">
              <Image
                style={{ ...styles.image, width: width/2}}
                source={{ uri: thumbnail }}
                className="rounded-md"
              />
            </View> */}

            <View
              className="flex flex-row items-center justify-between w-full px-4 mt-10 mb-4"
              style={{ width: width }}
            >
              <View className="flex flex-row items-center gap-2">
                <TouchableOpacity
                  onPress={
                    UserData
                      ? () => {
                          handleAddToCart(productId, UserData._id);
                        }
                      : () => setIsSignUpVisible(true)
                  }
                  className="px-5 py-[8px] bg-black border-gray-100  shadow-md border-1"
                >
                  <Text
                    className={` ${
                      width > 500 ? "text-xl" : "text-sm"
                    } font-semibold text-left text-white`}
                  >
                    {handleCartLoading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      " Add To Cart"
                    )}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex items-center justify-center ${
                    width > 500 ? "px-2" : "px-2"
                  } 
                 ${width > 500 ? "py-2" : "py-2"} bg-gray-100`}
                >
                  <Svg
                    width={`${width > 500 ? "30px" : "20px"}`}
                    height={`${width > 500 ? "30px" : "20px"}`}
                    viewBox="0 0 24.00 24.00"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000"
                    strokeWidth={0.00024000000000000003}
                  >
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 5.881A5.39 5.39 0 0116.05 4C18.822 4 21 6.178 21 8.95c0 3.4-3.055 6.17-7.684 10.367l-.011.01L12 20.515l-1.305-1.179-.036-.032C6.044 15.11 3 12.344 3 8.95 3 6.178 5.178 4 7.95 4A5.39 5.39 0 0112 5.881zm0 12.204l.09-.09c4.284-3.879 7.11-6.444 7.11-9.045 0-1.8-1.35-3.15-3.15-3.15-1.386 0-2.736.891-3.204 2.124h-1.683C10.686 6.691 9.336 5.8 7.95 5.8c-1.8 0-3.15 1.35-3.15 3.15 0 2.601 2.826 5.166 7.11 9.045l.09.09z"
                      fill="red"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>

              <View className="flex flex-row item-center">
                <Text className="text-[#00308F] font-bold text-lg">
                  ${price.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.info, width: width }}>
              <Text style={styles.name}>{title}</Text>

              <HTML source={{ html: description }} contentWidth={width} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
  },
  image: {
    aspectRatio: 1,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#999",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },

};

export default ProductDetails;
