import { StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import useThemeContext from "../hooks/useThemeContext";

export default function ThemedLink({
  extraStyle,
  url,
  isTitle = false,
  children,
  ...props
}) {
  const { themeColors } = useThemeContext();
  return (
    <Link href={url}>
      <Text
        style={[
          { color: themeColors.text },
          isTitle ? styles.title : styles.text,
          styles.link,
          extraStyle,
        ]}
        {...props}
      >
        {children}
      </Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  link: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});
