import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View, Text } from "react-native";
import { useColors } from "../../hooks/useColors";
import { useResponsiveFont, useResponsiveHeight } from "../../hooks/useResponsive";
import AppInput from "../ui/AppInput";
import AppPressable from "../ui/AppPressable";
import GoogleSignInButton from "../ui/GoogleSignInButton";

/**
 * @summary It is a responsive register form component
 * @returns {JSX.Element}
 */
const RegisterForm = () => {
    const { Colors } = useColors();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log(name, email, password);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Colors.core.bg,
            alignItems: "center",
            gap: useResponsiveHeight(5),
            paddingTop: useResponsiveHeight(10),
        }}>
            <Text style={{
                fontSize: useResponsiveFont(24),
                color: Colors.core.text,
                fontWeight: "bold",
                textAlign: "center",
                fontStyle: "italic",
            }}>
                Create Account
            </Text>
            <View>
                <AppInput placeholder="Full Name" value={name} onChangeText={setName} />
                <AppInput placeholder="Email" value={email} onChangeText={setEmail} isEmail={true} />
                <AppInput placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />
                <AppPressable title="Register" onPress={handleRegister} style={{
                    marginTop: useResponsiveHeight(2),
                }} />
            </View>
            <View>
                <GoogleSignInButton />
            </View>
        </SafeAreaView>
    );
};

export default RegisterForm;