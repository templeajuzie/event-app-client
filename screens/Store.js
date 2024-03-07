import React from "react";
import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, ScrollView, Pressable } from "react-native";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { UseProductProvider } from "../context/ProductProvider";
import Carousel from "react-native-reanimated-carousel";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import globalstyels from "../styles/globalstyels";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { ActivityIndicator } from "react-native";
import { useWindowDimensions } from "react-native";
import { useCustomFonts } from "../context/FontContext";
import AppLoading from "expo-app-loading";





const StoreScreen = () => {
  // const { width, height } = Dimensions.get("screen");
  
const { fontsLoaded, fontStyles } = useCustomFonts();

  const { height:screenHeight , width:screenWidth} = useWindowDimensions();
  // const windowDimensions = Dimensions.get("window");
  const IMG_WIDTH = screenWidth * 0.75;
  const IMG_HEIGHT = IMG_WIDTH / 5;
  const { allProducts, loading } = UseProductProvider()
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [numColumns, setNumColumns] = useState(2);

  if(allProducts =='undefined') return
  // const [filteredProducts,setFilteredProducts]=useState(null)
console.log("my products, allProduct")
 

   useEffect(() => {
     const isPortrait = screenWidth < 500; 
     setNumColumns(isPortrait ? 2 : 3);
   }, [screenWidth]);


  const uniqueCategories = [
    "All", ...new Set(allProducts && allProducts.map((product) => product.category)),
  ];

  const filteredProducts = selectedCategory
    ? allProducts && allProducts.filter((product) =>
      selectedCategory === "All"
        ? true
        : product.category === selectedCategory
    )
    : allProducts;







  const renderProductCard = ({ item }) => (
    <ProductCard
      title={item.title}
      description={item.description}
      thumbnail={item.thumbnail}
      price={item.price}
      productId={item._id}
      screenWidth={screenWidth}
      numColumns={numColumns}
      images={item.images}
    />
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  } 

  return (
    <SafeAreaView className="flex-1 bg-gray-200 ">
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      {allProducts.length === 0 ? (
        <View className="flex flex-1 items-center justify-center">
          <Text>No products have been uploaded yet</Text>
        </View>
      ) : (
        <View className="pt-2 pb-2 bg-white" >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            {uniqueCategories.map((category, index) => (
              <Pressable
                key={index}
                className={`px-2 py-2 h-10  mx-1 flex flex-row items-center justify-center w-32
            ${selectedCategory === category ? "bg-black" : "bg-gray-200"} `}
                onPress={() => {
                  setSelectedCategory(category);
                  // handleCategoryPress();
                }}
              >
                <Text
                  style={{ fontFamily: "PublicSans_600SemiBold" }}
                  className={`${
                    selectedCategory === category ? "text-white" : "text-black"
                  }`}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      <ScrollView className="mt-2" contentContainerStyle={{width:screenWidth}}>
        <View
         className="flex flex-row flex-1 flex-wrap " style={{maxWidth:screenWidth}}
        >
          {filteredProducts.map((item, index) => (
            <ProductCard
              key={item._id}
              title={item.title}
              description={item.description}
              thumbnail={item.thumbnail}
              price={item.price}
              productId={item._id}
              screenWidth={screenWidth}
              numColumns={numColumns}
              images={item.images}
              index={index}
            />
          ))}
        </View>
      </ScrollView>

      {/* <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={{ width: screenWidth }}
        className=" bg-gray-200"
      /> */}
    </SafeAreaView>
  );
};



export default StoreScreen;
