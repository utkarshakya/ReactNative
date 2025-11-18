import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";

import "./global.css";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            initialParams={{ alternativeName: "Mikaasa" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto"></StatusBar>
    </>
  );
}
