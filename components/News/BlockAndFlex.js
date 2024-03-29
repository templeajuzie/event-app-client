import {
  View,
  Text,
  Image,
  StatusBar,
  RefreshControl,
  TouchableHighlight,
  Linking,
  Pressable,
} from "react-native";
import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import globalstyels from "../../styles/globalstyels";

import { useFocusEffect } from "@react-navigation/native";
import { useCustomFonts } from "../../context/FontContext";
import AppLoading from "expo-app-loading";
import { useWindowDimensions } from "react-native";
const BlockAndFlex = ({ data, loading }) => {
  const {width}= useWindowDimensions()
  const { fontsLoaded, fontStyles } = useCustomFonts();
  const navigation = useNavigation();
  const handlePress = (item) => () => {
    navigation.navigate("NewsDetails", {
      id: item._id,
      title: item.title,
      category: item.category,
      image: item.blogimage,
      type: item.type,
      desc: item.longdescription,
    });
  };

  const capitalizeWithAcronym = (str) => {
    return str
      .split(" ") // Split the string into words
      .map((word) => {
        // Check if the word is an acronym (all capital letters)
        if (word === word.toUpperCase()) {
          return word; // Maintain the acronym as is
        }
        // Capitalize the word except for the acronym
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" "); // Join the words back together
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <View className="flex flex-col ">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <View className=" flex flex-col p-1 gap-2" key={index}>
              <View className=" w-full flex flex-col gap-1">
                <View className="h-5 w-full rounded-md bg-gray-300 animate-pulse" />
              </View>
              <View className="flex rounded w-full h-52 animate-pulse bg-gray-300" />
              <View className="flex-row flex justify-between gap-2 w-fit p-1">
                <View className=" w-2/3 flex flex-col gap-1">
                  <View className="h-5 w-full rounded-md bg-gray-300 animate-pulse" />
                  <View className="h-5 w-2/3 rounded-md bg-gray-300 animate-pulse" />
                </View>
                <View className="w-24 h-20 rounded animate-pulse bg-gray-300" />
              </View>
            </View>
          ))
        ) : (
          <Pressable>
            <View className="flex flex-col flex-1 p-1">
              <View className="border-b-gray-300 border-b mt-1 mb-3" />
              <Text
                className="flex-1 py-2 capitalize"
                style={{
                  fontFamily: "PublicSans_600SemiBold",
                  fontSize: width > 500 ? 20 : 16,
                }}
              >
                {data[0].title}
              </Text>
              <Pressable
                activeOpacity={0.5}
                onPress={handlePress(data[0])}
                className="flex-row flex justify-between gap-2 w-fit p-1 "
              >
                <Image
                  alt=""
                  className={`object-cover w-full ${
                    width > 500 ? "h-[400px]" : "h-52"
                  }  rounded-md border`}
                  source={{ uri: data[0].blogimage }}
                  resizeMethod="resize"
                />
              </Pressable>
            </View>
            <View className="border-b-gray-300 border-b mt-2 mb-2" />
            {data.slice(1).map((item) => (
              <View
                className="flex flex-col flex-1  w-full  rounded gap-y-[0px]"
                key={item._id}
              >
                <View className="">
                  <Pressable
                    activeOpacity={0.5}
                    onPress={handlePress(item)}
                    className="flex-row flex justify-between gap-2 w-fit p-1 "
                  >
                    <Text
                      className="w-2/3 capitalize"
                      style={{
                        fontFamily: "PublicSans_600SemiBold",
                        fontSize: width > 500 ? 20 : 16,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Image
                      alt=""
                      className={`object-cover ${
                        width > 500 ? "w-[200px]" : "w-24"
                      } ${
                        width > 500 ? "h-[150px]" : "h-20"
                      }  object-top rounded-md border`}
                      source={{ uri: item.blogimage }}
                      resizeMethod="resize"
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default BlockAndFlex;