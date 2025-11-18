import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "../hooks/useThemeContext";

const ThemedView = ({ extraStyle, children, ...rest }) => {
  const insets = useSafeAreaInsets();
  const { themeColors, tColors } = useThemeContext();

  const safeAreaStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  };

  return (
    <View
      style={[
        safeAreaStyle,
        styles.container,
        { backgroundColor: themeColors.background },
        extraStyle,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default ThemedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
