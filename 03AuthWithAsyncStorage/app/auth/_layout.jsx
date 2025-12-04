import { Stack } from "expo-router";
import useThemeContext from "../../src/hooks/useThemeContext";

const AuthLayout = () => {
  const { themeColors } = useThemeContext();
  return (
    <Stack
      initialRouteName="register"
      screenOptions={{
        animation: "none",
        headerStyle: {
          backgroundColor: themeColors.background,
        },
        headerTintColor: themeColors.text,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
};

export default AuthLayout;
