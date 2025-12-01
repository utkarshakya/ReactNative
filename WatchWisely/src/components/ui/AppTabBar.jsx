import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../../hooks/useColors";
import { useResponsiveFont, useResponsiveHeight, useResponsiveWidth } from "../../hooks/useResponsive";

const AppTabBar = ({ state, descriptors, navigation }) => {
  const { Colors } = useColors();

  const tabHeight = useResponsiveHeight(8);
  const fontSize = tabHeight * 0.1;
  const horizontal = useResponsiveWidth(5);
  const bottomPadding = useResponsiveHeight(2);

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
        borderRadius: 999,
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
              borderRadius: 999,
            }}
          >
            <Ionicons
              name={
                isFocused
                  ? options.tabBarFocusedIconName
                  : options.tabBarUnfocusedIconName
              }
              size={fontSize * 3}
              color={iconColor}
            />
            <Text
              style={{
                color: iconColor,
                fontSize,
                fontWeight: "bold"
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

export default AppTabBar;
