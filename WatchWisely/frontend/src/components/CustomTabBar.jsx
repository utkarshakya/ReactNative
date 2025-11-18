import { View, TouchableOpacity, Text } from "react-native";
import { useColors } from "../../src/hooks/useColors";
import {
  useResponsiveHeight,
  useResponsiveWidth,
} from "../../src/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { Colors } = useColors();

  const tabHeight = useResponsiveHeight(8); // ~8% of screen height
  const horizontal = useResponsiveWidth(8); // Side spacing based on screen width
  const bottomPadding = useResponsiveHeight(2); // Bottom padding based on screen height
  const radius = useResponsiveHeight(5); // Border radius based on screen height
  const iconSize = useResponsiveWidth(6); // Icon size based on screen width
  const labelFontSize = useResponsiveWidth(3); // Label font size based on screen width

  return (
    <View
      style={{
        position: "absolute",
        bottom: bottomPadding,
        left: horizontal,
        right: horizontal,
        height: tabHeight,
        width: "auto",
        backgroundColor: Colors.tab.tabBg,
        borderRadius: radius,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        // Shadows
        shadowColor: Colors.shadow.shadow3,
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: Colors.tab.tabBorder,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconColor = isFocused
          ? Colors.tab.tabIconActive
          : Colors.tab.tabIconInactive;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: tabHeight,
              borderRadius: radius,
            }}
          >
            <Ionicons
              name={
                isFocused
                  ? options.tabBarFocusedIconName
                  : options.tabBarUnfocusedIconName
              }
              size={iconSize}
              color={iconColor}
            />
            <Text
              style={{
                color: iconColor,
                fontSize: labelFontSize,
                fontWeight: "bold",
              }}
            >
              {options.tabBarLabel || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
