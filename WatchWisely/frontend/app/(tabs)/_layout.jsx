import { Tabs } from "expo-router";
import AppTabBar from "../../src/components/ui/AppTabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={({ state, descriptors, navigation }) => (
        <AppTabBar
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      )}
      initialRouteName="profile"
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
