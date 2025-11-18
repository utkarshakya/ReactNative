import React from "react";
import { View, Text, Image } from "react-native";
import { Star } from "lucide-react-native";

const ProductCard = ({ product }) => {
  return (
    <View className="bg-white rounded-2xl shadow p-4 m-5">
      <Image
        source={{ uri: product.image?.[0] }}
        className="w-full h-60 rounded-xl mb-3"
        resizeMode="cover"
      />
      <Text className="text-lg font-semibold text-gray-900" numberOfLines={1}>
        {product.name}
      </Text>
      <Text className="text-gray-600 text-sm mb-1" numberOfLines={2}>
        {product.description}
      </Text>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-xl font-bold text-green-600">
          ₹{product.price}
        </Text>
        <View className="flex-row items-center">
          <Star size={16} color="gold" fill="gold" />
          <Text className="text-sm ml-1 text-gray-800">{product.rating}</Text>
        </View>
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-xs text-gray-500">{product.brand}</Text>
        <Text className="text-xs text-gray-500">{product.category}</Text>
      </View>
    </View>
  );
};

export default ProductCard;
