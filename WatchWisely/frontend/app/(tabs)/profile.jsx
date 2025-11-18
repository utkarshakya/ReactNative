import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "../../src/hooks/useColors";
import { useResponsiveFont } from "../../src/hooks/useResponsive";

const Profile = () => {
  const { Colors } = useColors();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.core.bg,
      }}
    >
      <Text
        style={{
          color: Colors.core.text,
          fontSize: useResponsiveFont(30),
          lineHeight: useResponsiveFont(40),
          fontStyle: "italic",
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>
      <View>
        
      </View>
    </SafeAreaView>
  );
};

export default Profile;
