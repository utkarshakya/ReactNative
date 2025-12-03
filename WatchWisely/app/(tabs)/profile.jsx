import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, logout, logoutWithGoogle } from "../../src/store/slice/authSlice";
import { useColors } from "../../src/hooks/useColors";
import {
  useResponsiveFont,
  useResponsiveHeight,
  useResponsiveWidth,
} from "../../src/hooks/useResponsive";
import AppPressable from "../../src/components/ui/AppPressable";
import LoginForm from "../../src/components/forms/LoginForm";
import RegisterForm from "../../src/components/forms/RegisterForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const dispatch = useDispatch();
  const { Colors } = useColors();
  const { user } = useSelector(selectAuth);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fontSize = useResponsiveFont(14);
  const smallFont = useResponsiveFont(12);
  const largeFont = useResponsiveFont(18);
  const padding = useResponsiveWidth(5);
  const spacing = useResponsiveHeight(2);

  const handleLogout = async () => {
    await dispatch(logoutWithGoogle());
    dispatch(logout());
  };

  if (!user) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.core.bg }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: padding,
          }}
        >
          {showLogin ? (
            <>
              <LoginForm />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: spacing * 2,
                }}
              >
                <Text
                  style={{ color: Colors.core.subText, fontSize: smallFont }}
                >
                  Don't have an account?{" "}
                </Text>
                <Pressable onPress={() => setShowLogin(false)}>
                  <Text
                    style={{
                      color: Colors.brand.primary,
                      fontSize: smallFont,
                      fontWeight: "600",
                    }}
                  >
                    Register
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <RegisterForm />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: spacing * 2,
                }}
              >
                <Text
                  style={{ color: Colors.core.subText, fontSize: smallFont }}
                >
                  Already have an account?{" "}
                </Text>
                <Pressable onPress={() => setShowLogin(true)}>
                  <Text
                    style={{
                      color: Colors.brand.primary,
                      fontSize: smallFont,
                      fontWeight: "600",
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.core.bg }}
      contentContainerStyle={{ paddingVertical: spacing * 2 }}
    >
      {/* Header Section */}
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: padding,
          marginBottom: spacing * 3,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: Colors.brand.primary,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: spacing * 2,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: Colors.ui.buttonText,
            }}
          >
            {user.name?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <Text
          style={{
            fontSize: largeFont,
            fontWeight: "600",
            color: Colors.core.text,
          }}
        >
          {user.name || "User"}
        </Text>
      </View>

      {/* Profile Information */}
      <View style={{ paddingHorizontal: padding }}>
        {/* Email */}
        <View
          style={{
            backgroundColor: Colors.surface.surface1,
            borderRadius: 12,
            padding: padding,
            marginBottom: spacing * 2,
            borderLeftWidth: 4,
            borderLeftColor: Colors.brand.primary,
          }}
        >
          <Text
            style={{
              fontSize: smallFont,
              color: Colors.core.subText,
              marginBottom: spacing * 0.5,
              fontWeight: "500",
            }}
          >
            Email
          </Text>
          <Text
            style={{
              fontSize: fontSize,
              color: Colors.core.text,
              fontWeight: "600",
            }}
          >
            {user.email || "N/A"}
          </Text>
        </View>

        {/* Account Created */}
        <View
          style={{
            backgroundColor: Colors.surface.surface1,
            borderRadius: 12,
            padding: padding,
            marginBottom: spacing * 2,
            borderLeftWidth: 4,
            borderLeftColor: Colors.brand.secondary,
          }}
        >
          <Text
            style={{
              fontSize: smallFont,
              color: Colors.core.subText,
              marginBottom: spacing * 0.5,
              fontWeight: "500",
            }}
          >
            Member Since
          </Text>
          <Text
            style={{
              fontSize: fontSize,
              color: Colors.core.text,
              fontWeight: "600",
            }}
          >
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </Text>
        </View>

        {/* Auth Method */}
        <View
          style={{
            backgroundColor: Colors.surface.surface1,
            borderRadius: 12,
            padding: padding,
            marginBottom: spacing * 3,
            borderLeftWidth: 4,
            borderLeftColor: Colors.brand.accent,
          }}
        >
          <Text
            style={{
              fontSize: smallFont,
              color: Colors.core.subText,
              marginBottom: spacing * 0.5,
              fontWeight: "500",
            }}
          >
            Login Method
          </Text>
          <Text
            style={{
              fontSize: fontSize,
              color: Colors.core.text,
              fontWeight: "600",
            }}
          >
            {user.authMethod?.google?.id ? "Google" : "Email/Password"}
          </Text>
        </View>

        {/* Logout Button */}
        <View style={{ width: "100%" }}>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => ({
              backgroundColor: Colors.semantic.error,
              paddingVertical: spacing * 1.5,
              borderRadius: 999,
              alignItems: "center",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              style={{
                color: "white",
                fontSize: fontSize,
                fontWeight: "600",
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
