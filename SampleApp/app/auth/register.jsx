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
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    isPasswordVisible,
    setIsPasswordVisible,
    isLoggedIn,
    error,
    setError,
    register,
  } = useUserContext();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView>
        <ThemedText isTitle={true}>Create An Account</ThemedText>
        <Spacer />
        <ThemedInput
          placeholder={"Enter your Full Name"}
          value={fullName}
          onChangeText={setFullName}
        />
        <ThemedInput
          placeholder={"Enter your email address"}
          isEmail={true}
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ flexDirection: "row", position: "relative" }}>
          <ThemedInput
            placeholder={"Create a strong password"}
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
          title={"Sign Up"}
          onPress={() => {
            register(fullName, email, password);
          }}
        />
        <Spacer height={20} />
        <ThemedText extraStyle={{ fontSize: 14 }}>
          Already have an account
        </ThemedText>
        <ThemedLink
          url={"/login"}
          extraStyle={{ fontSize: 14, color: "skyblue" }}
        >
          Login instead
        </ThemedLink>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
