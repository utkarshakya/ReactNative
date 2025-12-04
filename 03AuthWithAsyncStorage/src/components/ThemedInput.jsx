import { StyleSheet, TextInput } from "react-native";
import useThemeContext from "../hooks/useThemeContext";

const ThemedInput = ({
  style,
  placeholder,
  isEmail = false,
  isPassword = false,
  isPasswordVisible,
  isNumber = false,
  value,
  onChangeText,
  ...props
}) => {
  const { themeColors } = useThemeContext();
  return (
    <TextInput
      style={[styles.input, { color: themeColors.text }, style]}
      placeholderTextColor={themeColors.placeholder}
      placeholder={placeholder}
      keyboardType={
        isEmail ? "email-address" : isNumber ? "numeric" : "default"
      }
      secureTextEntry={isPassword && !isPasswordVisible ? true : false}
      autoCapitalize={isPassword ? false : isEmail ? false : true}
      autoCorrect={isPassword ? false : true}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#cccccc",
    fontSize: 16,
  },
});
