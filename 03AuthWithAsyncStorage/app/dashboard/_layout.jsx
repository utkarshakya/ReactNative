import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "../../src/hooks/useThemeContext";
import useUserContext from "../../src/hooks/useUserContext";

const DashboardLayout = () => {
  const router = useRouter();
  const { isLoggedIn } = useUserContext();
  const { themeColors } = useThemeContext();

  if (!isLoggedIn) {
    router.replace("/auth/login");
    return;
  }

  return (
    <Tabs
      initialRouteName="profile"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themeColors.background,
          height: 70,
        },
        tabBarActiveTintColor: themeColors.secondary,
        tabBarInactiveTintColor: themeColors.primary,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "person" : "person-outline"}
              color={themeColors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "create" : "create-outline"}
              color={themeColors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: "Books",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "book" : "book-outline"}
              color={themeColors.primary}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
