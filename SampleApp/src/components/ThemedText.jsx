import { StyleSheet, Text } from "react-native";
import useThemeContext from "../hooks/useThemeContext";

const ThemedText = ({ extraStyle, isTitle = false, children, ...rest }) => {
  const { themeColors } = useThemeContext();

  return (
    <Text
      style={[
        { color: themeColors.text },
        isTitle ? styles.title : styles.text,
        extraStyle,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
});
