import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeToggleButton } from "../src/components";
import useThemeContext from "../src/hooks/useThemeContext";

const RootLayout = () => {
  const { themeMode, themeColors } = useThemeContext();

  return (
    <>
      {themeMode === "dark" ? (
        <StatusBar style="light" />
      ) : (
        <StatusBar style="dark" />
      )}
      <Stack
        screenOptions={{
          headerRight: () => <ThemeToggleButton />,
          headerStyle: {
            backgroundColor: themeColors.background,
          },
          headerTitleStyle: {
            color: themeColors.title,
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;
