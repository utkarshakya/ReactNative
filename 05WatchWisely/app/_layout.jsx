import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/store";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constant from "expo-constants";

export default function RootLayout() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constant.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: ["profile", "email"],
    });
  }, []);
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
