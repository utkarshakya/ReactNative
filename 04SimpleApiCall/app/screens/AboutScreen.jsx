import { View, Text } from "react-native";

export default function AboutScreen({ route }) {
  console.log(route);
  return (
    <View className="flex-1 justify-center items-center bg-zinc-500">
      <Text className="text-white text-xl font-bold">
        You Know You Don't Know Anything About Us
        {JSON.stringify(route.params?.alternativeName)}
      </Text>
    </View>
  );
}
