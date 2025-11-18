import { Tabs } from "expo-router";
import CustomTabBar from "../../src/components/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarFocusedIconName: "home",
          tabBarUnfocusedIconName: "home-outline",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarFocusedIconName: "search",
          tabBarUnfocusedIconName: "search-outline",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarFocusedIconName: "person",
          tabBarUnfocusedIconName: "person-outline",
        }}
      />
    </Tabs>
  );
}
