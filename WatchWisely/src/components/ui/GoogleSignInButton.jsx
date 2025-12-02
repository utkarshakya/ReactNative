import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { Image } from "expo-image";
import { useColors } from "../../hooks/useColors";
import {
  useResponsiveFont,
  useResponsiveHeight,
  useResponsiveWidth,
} from "../../hooks/useResponsive";
import Constants from "expo-constants";

import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, selectAuth } from "../../store/slice/authSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

/**
 * A custom Google Sign-In button component that uses the Expo AuthSession API
 * to handle the authentication flow.
 * @param {Object} props - Component props
 * @param {boolean} props.disabled - Whether the button is disabled or not
 * @param {Object} props.style - Additional styles to apply to the button
 * @returns {JSX.Element} - A Pressable component with Google branding and styling
 */
const GoogleSignInButton = ({ disabled = false, style = {} }) => {
  const { Colors } = useColors();
  const dispatch = useDispatch();

  const { isLoading } = useSelector(selectAuth);

  // Google branding colors
  const backgroundColor = "#FFFFFF"; // Standard white background
  const textColor = "#1F1F1F"; // Standard dark text
  const shadowColor = Colors.shadow.shadow1;
  const fontSize = useResponsiveFont(14);
  const paddingVertical = useResponsiveHeight(1.5);
  const width = useResponsiveWidth(90);
  const iconSize = useResponsiveFont(20);

  const handleGoogleSignIn = async () => {
    try {
      // Step 1: Check if Google Play Services are available (Android only)
      await GoogleSignin.hasPlayServices();

      // Step 2: Trigger Google Sign-In UI
      const userInfo = await GoogleSignin.signIn();

      // Step 3: Extract the idToken from response
      const idToken = userInfo.data.idToken;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      // ADD THIS LOGGING
      console.log("=== Sign-In Success ===");
      console.log("Got idToken:", idToken.substring(0, 50) + "..."); // Show first 50 chars
      console.log("User email:", userInfo.data.user.email);
      console.log(
        "Sending to backend:",
        Constants.expoConfig?.extra?.AUTH_API_URL
      );

      // Step 4: Send idToken to your backend via Redux
      const result = await dispatch(loginWithGoogle(idToken)).unwrap();

      // Step 5: Success! User is logged in
      console.log("Login successful:", result.user);
    } catch (error) {
      // Enhanced error logging
      console.error("=== Google Sign-In Error Details ===");
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Log backend response if it exists
      if (error.response) {
        console.error("Backend status:", error.response.status);
        console.error("Backend data:", error.response.data);
      }

      // Log the full error object
      console.error("Full error:", JSON.stringify(error, null, 2));

      if (error.code === "SIGN_IN_CANCELLED") {
        Alert.alert("Cancelled", "Sign-in was cancelled");
      } else if (error.code === "IN_PROGRESS") {
        Alert.alert("Please wait", "Sign-in is already in progress");
      } else if (error.code === "PLAY_SERVICES_NOT_AVAILABLE") {
        Alert.alert("Error", "Google Play Services not available");
      } else {
        // Show more details in the alert
        Alert.alert(
          "Sign-In Failed",
          error.message || "Something went wrong. Check console for details."
        );
      }
    }
  };

  return (
    <Pressable
      onPress={handleGoogleSignIn}
      disabled={disabled || isLoading}
      style={({ pressed }) => [
        styles.container,
        {
          width,
          paddingVertical,
          backgroundColor,
          shadowColor,
        },
        pressed && styles.pressed,
        (disabled || isLoading) && styles.disabled,
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: "https://developers.google.com/identity/images/g-logo.png",
          }}
          style={{ width: iconSize, height: iconSize, marginRight: 12 }}
          contentFit="contain"
        />
        <Text style={[styles.text, { color: textColor, fontSize }]}>
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: "#F5F5F5",
  },
  disabled: {
    opacity: 0.6,
  },
});

export default GoogleSignInButton;
