import { Pressable, Text, StyleSheet } from "react-native";
import useThemeContext from "../hooks/useThemeContext";

export default function ThemedPressable({
  title,
  onPress,
  extraStyle,
  textStyle,
}) {
  const { themeColors } = useThemeContext();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#0051A8" : "#007AFF",
          opacity: pressed ? 0.95 : 1,
        },
        styles.button,
        extraStyle,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: themeColors.text }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
