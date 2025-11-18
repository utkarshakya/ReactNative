import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../src/globals.css";
import { persistor, store } from "../../src/store";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="movies/[id]"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <StatusBar />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
