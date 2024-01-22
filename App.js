import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import ProductProvider from "./context/ProductProvider";
import DrawerNavigator from "./navigation/DrawerNavigator";


export default function App() {
  return (
    <NavigationContainer>
      <ProductProvider>
        <DrawerNavigator />
      </ProductProvider>
    </NavigationContainer>
  );
}
