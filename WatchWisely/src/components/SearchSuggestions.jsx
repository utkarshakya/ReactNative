import { FlatList, Text, View } from "react-native";
import { useColors } from "../hooks/useColors";
import { useResponsiveHeight } from "../hooks/useResponsive";
import MovieCard from "./MovieCard";
import PulsePosterSkeleton from "./PulsePosterSkeleton";

const SearchSuggestions = ({ isLoading = false, data }) => {
  // View Styling
  const height = useResponsiveHeight(70);
  const paddingVertical = useResponsiveHeight(1);

  return (
    <View
      style={{
        height,
        paddingVertical,
      }}
    >
      {isLoading ? (
        <FlatList
          data={[...Array(9).keys()]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <PulsePosterSkeleton relativeHeight={20} relativeBorderRadius={2} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <MovieCard data={item} relativeHeight={20} relativeBorderRadius={2}/>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default SearchSuggestions;
