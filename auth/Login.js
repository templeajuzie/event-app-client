import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Logo from "../assets/AbcstudioNo.png";
import { Pressable } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { UseProductProvider } from "../context/ProductProvider";
import { useNavigation } from "@react-navigation/native";
import { NAME_REGEX, PASSWORD_REGEX, EMAIL_REGEX } from "../utils/regex";
import Api from "../utils/Api";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseUserContext } from "../context/UserContext";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const { setIsSignInVisible, setIsSignUpVisible } = UseUserContext();
  const [universalError, setUniversalError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  // Define initial validation state
  const [isValidData, setIsValidData] = useState(true);
  // Define the initial loginform data

  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  function signUpValidate(fieldName, regex, value, errorMessage) {
    if (!regex.test(value)) {
      setUniversalError("");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      setIsValidData(false);
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      setIsValidData(true);

      setUniversalError("");
    }
  }

  const handleInputChange = (name, value, id) => {
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });

    if (name === "email") {
      signUpValidate(name, EMAIL_REGEX, value, "Invalid email format");
    } else if (name === "password") {
      signUpValidate(name, PASSWORD_REGEX, value, "Password is too weak");
    } 
  };

  // Define Variable for allfield valid

  const allFieldsValid = Object.keys(errorMessages).every(
    (field) => !errorMessages[field]
  );

 const handleSubmit = async () => {

   try {
     // perform an asynchronous request to sign in the user
     console.log(signUpFormData, "signin data");
     const response = await fetch(
       `${process.env.EXPO_PUBLIC_SERVER_URL}client/auth/signin`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email: signUpFormData.email,
           password: signUpFormData.password,
         }),
       }
     );

     console.log("my response", response);
     const result = await response.json()
     console.log("my result", result)

     if (response.ok) {
       const { message, olduser, authToken } = result;
       console.log("my message", message);

       // Store authToken in AsyncStorage
       await AsyncStorage.setItem("authToken", JSON.stringify(authToken));
       setIsSignUpVisible(false);
     } else {
       // If the response status is not okay, handle the error
       const { error: errorMessage } = await response.json();
       console.error("error signing in:", errorMessage);
       Alert.alert("Error signing in account", errorMessage);
     }
   } catch (error) {
     console.error("error signing in:", error.message);
     Alert.alert("Error signing in account", "An unexpected error occurred.");
   }
 };


  return (
    <View className="flex items-center justify-center m-auto w-full px-6 bg-[#F2F2F2]">
      <View className="gap-6 w-full">
        <View className="flex items-center justify-center ">
          <Image source={Logo} className="w-40 h-20" resizeMode="cover" />
          <Text className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
            Log in
          </Text>
          <Text className="text-[14px] text-gray-500">
            Hey enter your details to create your account
          </Text>
        </View>

        <View className="gap-2">
         
          <View>
            <TextInput
              placeholder="Enter your email"
              className="w-auto px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none  focus:bg-white "
              keyboardType="email-address"
              value={signUpFormData.email}
              onChangeText={(value) => {
                handleInputChange("email", value);
              }}
            />
            {errorMessages.email && (
              <Text className="text-red-500 my-1 text-[13px]">
                {errorMessages.email}
              </Text>
            )}
          </View>

          <View>
            <View className="flex flex-row items-center justify-between border border-gray-200 rounded-lg">
              <TextInput
                placeholder="Enter password"
                secureTextEntry={!passwordVisible}
                className="px-4 d py-2.5 text-base text-gray-900 font-normal bg-gray-100 focus:bg-white flex-grow rounded-l-lg"
                value={signUpFormData.password}
                onChangeText={(value) => {
                  handleInputChange("password", value);
                }}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="h-full flex flex-row items-center justify-center px-2 rounded-r-lg bg-white"
              >
                {passwordVisible ? (
                  <Ionicons name="eye-off-sharp" size={23} />
                ) : (
                  <Ionicons name="eye-sharp" size={23} />
                )}
              </TouchableOpacity>
            </View>

            {errorMessages.password && (
              <Text className="text-red-500 my-1 text-[13px]">
                {errorMessages.password}
              </Text>
            )}
          </View>
        </View>
        <View>
          <TouchableOpacity
            title=""
            className={` items-center justify-center tracking-wide font-semibold ${
              !allFieldsValid ? "bg-blue-600/30" : "bg-blue-900"
            }  text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out  focus:shadow-outline focus:outline-none`}
            onPress={() => handleSubmit()}
            disabled={!allFieldsValid}
          >
            <View className="flex flex-row gap-2 items-center">
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: 5 }}
              >
                <Path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <Circle cx="8.5" cy="7" r="4" />
                <Path d="M20 8v6M23 11h-6" />
              </Svg>
              <Text className="text-white text-center">Log in</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-center text-gray-500">
            New?
          </Text>
          <Pressable
            className="text-center text-gray-500"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-blue-900 font-semibold">Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
