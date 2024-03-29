import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import ProductProvider from "./context/ProductProvider";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { NativeWindStyleSheet } from "nativewind";
import { UseProductProvider } from "./context/ProductProvider";
import TestSignUp from "./auth/TestSignUp";
import Login from "./auth/Login";
import { useState } from "react";
import Recovery from "./auth/Recovery";
import Updatepassword from "./auth/Updatepassword";
import { AuthStackNavigator } from "./navigation/StackNavigator";

NativeWindStyleSheet.setOutput({
  default: "native",
});

function AppContent() {
  const { isSignUpVisible, isSignInVisible, recoverVisible } =
    UseProductProvider();

  return (
    <>
      {isSignUpVisible ? (
        <TestSignUp />
      ) : isSignInVisible ? (
        recoverVisible ? (
          <Recovery />
        ) : (
          <Login />
        )
      ) : (
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      )}
    </>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <AppContent />
    </ProductProvider>
  );
}
