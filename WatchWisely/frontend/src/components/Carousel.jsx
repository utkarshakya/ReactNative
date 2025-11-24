import { FlatList, Text, View } from "react-native";
import MovieCard from "./MovieCard";
import PulsePosterSkeleton from "./PulsePosterSkeleton";
import { useResponsiveHeight } from "../hooks/useResponsive";

const Carousel = ({
  isLoading,
  data,
  outerStyle = {
    relativeTopMargin: 1,
  },
}) => {
  const marginTop = useResponsiveHeight(outerStyle.relativeMarginFromTop);

  return (
    <View
      style={{
        marginTop,
      }}
    >
      {/* <Text style={{
        color: '#d1d5db',
        marginHorizontal: 20,
        marginBottom: 8,
        fontSize: 20,
        fontWeight: 'bold'
      }}>
        TOP RATED data
      </Text> */}
      {isLoading ? (
        <FlatList
          horizontal
          data={[...Array(6).keys()]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <PulsePosterSkeleton relativeHeight={30} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <MovieCard data={item} relativeHeight={30} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Carousel;
