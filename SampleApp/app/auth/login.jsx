import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Spacer,
  ThemedIcon,
  ThemedInput,
  ThemedLink,
  ThemedPressable,
  ThemedText,
  ThemedView,
} from "../../src/components";
import useUserContext from "../../src/hooks/useUserContext";
import { router } from "expo-router";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isPasswordVisible,
    setIsPasswordVisible,
    error,
    login,
    logout,
  } = useUserContext();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView>
        <ThemedText isTitle={true}>Welcome Back</ThemedText>
        <Spacer />
        <ThemedInput
          placeholder={"Enter your email address"}
          isEmail={true}
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ flexDirection: "row", position: "relative" }}>
          <ThemedInput
            placeholder={"Enter your password"}
            isPassword={true}
            value={password}
            onChangeText={setPassword}
            isPasswordVisible={isPasswordVisible}
          />
          <ThemedIcon
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
            extraStyle={{
              position: "absolute",
              right: 20,
              top: 0,
              height: "100%",
              justifyContent: "center",
            }}
          />
        </View>
        {error && (
          <ThemedText extraStyle={{ color: "#f44336" }}>{error}</ThemedText>
        )}
        <Spacer />
        <ThemedPressable
          title={"Log In"}
          onPress={async () => {
            const isValid = await login(email, password);
            if (isValid) {
              router.replace("/(dashboard)/profile");
            }
          }}
        />

        <Spacer height={20} />
        <ThemedText extraStyle={{ fontSize: 14 }}>New here</ThemedText>
        <ThemedLink
          url={"/register"}
          extraStyle={{ fontSize: 14, color: "skyblue" }}
        >
          Create a new account
        </ThemedLink>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
