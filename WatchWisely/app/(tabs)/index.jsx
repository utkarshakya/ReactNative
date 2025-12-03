import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "../../src/hooks/useColors";

// Redux
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../src/components/Carousel";
import {
  fetchPopularMovies,
  selectMovies
} from "../../src/store/slice/movieSlice";

import {
  useResponsiveFont,
  useResponsiveHeight,
} from "../../src/hooks/useResponsive";

const Index = () => {
  const { Colors } = useColors();
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(selectMovies);

  // Responsive Styles
  const titleFont = useResponsiveFont(25); // ~25px responsive
  const topSpacing = useResponsiveHeight(4); // top padding

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (status === "failed") {
    const errorMessage = typeof error === 'string' ? error : error?.message || 'Failed to load movies';
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.core.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.semantic.error,
            fontSize: titleFont * 0.75,
            fontWeight: "600",
          }}
        >
          Error: {errorMessage}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.core.bg,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          paddingTop: topSpacing,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: titleFont,
            fontWeight: "bold",
            color: Colors.core.text,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Welcome
        </Text>

        {status === "loading" ? (
          <Carousel isLoading={true} outerStyle={{
            relativeMarginFromTop: 3,
          }} />
        ) : (
          <Carousel data={data} outerStyle={{ relativeMarginFromTop: 3 }} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
