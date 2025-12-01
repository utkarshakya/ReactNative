import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View, Text } from "react-native";
import { useColors } from "../../hooks/useColors";
import { useResponsiveFont, useResponsiveHeight, useResponsiveWidth } from "../../hooks/useResponsive";
import AppInput from "../ui/AppInput";
import AppPressable from "../ui/AppPressable";

/**
 * @summary It is a responsive register form component
 * @returns {JSX.Element}
 */
const LoginForm = () => {
    const { Colors } = useColors();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log(email, password);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Colors.core.bg,
            justifyContent: "center",
            alignItems: "center",
            gap: useResponsiveHeight(5),
        }}>
            <Text style={{
                fontSize: useResponsiveFont(24),
                color: Colors.core.text,
                fontWeight: "bold",
                textAlign: "center",
                fontStyle: "italic",
            }}>
                Login
            </Text>
            <View>
                <AppInput placeholder="Email" value={email} onChangeText={setEmail} isEmail={true} />
                <AppInput placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />
                <AppPressable title="Login" onPress={handleRegister} />
            </View>
        </SafeAreaView>
    );
};

export default LoginForm;