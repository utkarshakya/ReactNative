import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View, Text } from "react-native";
import { useColors } from "../../hooks/useColors";
import {
  useResponsiveFont,
  useResponsiveHeight,
} from "../../hooks/useResponsive";
import AppInput from "../ui/AppInput";
import AppPressable from "../ui/AppPressable";
import GoogleSignInButton from "../ui/GoogleSignInButton";
import { useDispatch } from "react-redux";
import { register } from "../../store/slice/authSlice";

/**
 * @summary It is a responsive register form component
 * @returns {JSX.Element}
 */
const LoginForm = () => {
  const { Colors } = useColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(login());
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.core.bg,
        alignItems: "center",
        gap: useResponsiveHeight(5),
        paddingTop: useResponsiveHeight(10),
      }}
    >
      <Text
        style={{
          fontSize: useResponsiveFont(24),
          color: Colors.core.text,
          fontWeight: "bold",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Login
      </Text>
      <View>
        <AppInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          isEmail={true}
        />
        <AppInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />
        <AppPressable
          title="Login"
          onPress={handleSubmit}
          style={{
            marginTop: useResponsiveHeight(2),
          }}
        />
      </View>
      <View>
        <GoogleSignInButton />
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
