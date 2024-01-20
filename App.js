import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import ProductProvider from "./context/ProductProvider";

export default function App() {
  return (
    <NavigationContainer>
      <ProductProvider>
        <DrawerNavigator />
      </ProductProvider>
    </NavigationContainer>
  );
}
