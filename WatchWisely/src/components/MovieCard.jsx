import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  useResponsiveHeight,
  useResponsiveWidth,
} from "../hooks/useResponsive";
import Constants from "expo-constants";

const TMDB_IMAGE_BASE_URL = Constants.expoConfig?.extra?.TMDB_IMAGE_BASE_URL;

const MovieCard = ({
  data,
  relativeHeight,
  relativeMargin = 1,
  relativeBorderRadius = 1,
  aspectRatio = 2 / 3,
}) => {
  const uri = data?.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${data.poster_path}`
    : null;

  const height = useResponsiveHeight(relativeHeight);
  const borderRadius = useResponsiveHeight(relativeBorderRadius);
  const margin = useResponsiveWidth(relativeMargin);

  if (!uri) {
    return null;
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push(`/movies/${data.id}`)}
        style={{
          margin,
        }}
      >
        <View>
          <Image
            source={{ uri }}
            style={{
              height,
              borderRadius,
              aspectRatio,
            }}
            resizeMode="cover"
          />
        </View>
        {/* <Text 
            numberOfLines={1} 
            style={{
              color: '#ffffff',
              marginTop: 6
            }}
        >
            {data.title || data.name}
        </Text> */}
      </TouchableOpacity>
    );
  }
};

export default MovieCard;
