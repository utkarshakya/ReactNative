import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "../hooks/useThemeContext";

const ThemedIcon = ({
  extraStyle,
  isPasswordVisible,
  setIsPasswordVisible,
  ...rest
}) => {
  const { themeColors } = useThemeContext();
  return (
    <TouchableOpacity
      style={[styles.iconButton, extraStyle]}
      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      {...rest}
    >
      <Ionicons
        name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
        size={24}
        color={themeColors.text}
      />
    </TouchableOpacity>
  );
};

export default ThemedIcon;

const styles = StyleSheet.create({
  iconButton: {
    padding: 5,
  },
});
