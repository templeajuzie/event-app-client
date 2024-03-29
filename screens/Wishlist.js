import React from "react";
import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { UseProductProvider } from "../context/ProductProvider";
import WishlistCard from "../components/products/WishlistCard";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import basket from "../assets/emptycart.jpg"
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyels from "../styles/globalstyels";
import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "../context/UserContext";



const { width } = Dimensions.get("window");

const Wishlist = () => {
  const { wishlist } = UseProductProvider()
  const { UserData, setIsSignUpVisible } = UseUserContext();
  

  
  if (!UserData) {
    const handleLoginPress = () => {
      // Navigate to the login screen
      setIsSignUpVisible(true);
    };
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text className="mb-[20px] text-md">You are not logged in!</Text>
        <Text style={{ marginBottom: 20 }}>
          Please log in to view your wishlist
        </Text>
        <TouchableOpacity
          onPress={handleLoginPress}
          className
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
        >
          <Text className="text-white text-[16px]">Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  if (UserData && wishlist.length == 0) {
    const navigation = useNavigation()
    return (
      <SafeAreaView style={globalstyels.droidSafeArea}>
        <View className="flex flex-1 items-center justify-center sm:mx-12 sm:shadow-lg sm:py-7 "> 
          <View className="flex flex-col items-center  gap-2">
            <Image
              source={basket}
              className="w-[200px] h-[200px] object-contain"
            />
            <Text className="text-[#575746] font-bold">No items saved here</Text>
            <Text className="text-sm ml-3  text-center text-[#313133]  ">
              Why not explore our latest products and discover something you
              love
            </Text>
            <TouchableOpacity
              className="flex items-center justify-center p-2 bg-[#2c3e50] shadow-md rounded-sm "
              onPress={() =>
                 navigation.navigate("Store")
              }
            >
              <Text className="text-white">Explore now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
}

  const renderProductCard = ({ item }) => (
    <WishlistCard
      title={item.title}
      description={item.description}
      thumbnail={item.thumbnail}
      price={item.price}
      productId={item._id}
    />
  );

 

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <FlatList
        data={wishlist}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },

  columnWrapper: {
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    padding: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Wishlist;
