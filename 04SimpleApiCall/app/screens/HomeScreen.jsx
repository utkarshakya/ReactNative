import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductSection from "../components/ProductSection";
// import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    // <SafeAreaView>
      <View className="flex-1 items-center justify-center bg-gray-800">
        <Text className="font-bold text-white text-3xl mt-20 py-5">Products</Text>
        <ProductSection />
      </View>
    // </SafeAreaView>
  );
}
