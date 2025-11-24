import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CustomSearchBar from "../../src/components/CustomSearchBar";
import SearchSuggestions from "../../src/components/SearchSuggestions";
import { useColors } from "../../src/hooks/useColors";
import {
  useResponsiveFont,
  useResponsiveHeight,
  useResponsiveWidth,
} from "../../src/hooks/useResponsive";
import {
  clearSearch,
  fetchSearch,
  selectSearch,
} from "../../src/store/slice/searchSlice";
import { optimizeSearchResults } from "../../src/utils/functions";

const Search = () => {
  const dispatch = useDispatch();
  const { search, searchStatus } = useSelector(selectSearch);

  const { Colors } = useColors();

  const [query, setQuery] = useState("");
  const searchPromiseRef = useRef(null);

  const optimizedSearch = optimizeSearchResults(search);

  // Responsive spacing/sizing
  const titleSize = useResponsiveFont(25);
  const topSpacing = useResponsiveHeight(4);
  const horizontalMargin = useResponsiveWidth(5);

  useEffect(() => {
    searchPromiseRef.current?.abort();
    searchPromiseRef.current = null;

    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      dispatch(clearSearch());
      return;
    }

    const delay = setTimeout(() => {
      const promise = dispatch(fetchSearch(trimmedQuery));
      searchPromiseRef.current = promise;
    }, 1000);

    return () => clearTimeout(delay);
  }, [dispatch, query]);

  useEffect(() => {
    return () => searchPromiseRef.current?.abort();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.core.bg,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: topSpacing,
        }}
      >
        <Text
          style={{
            fontSize: titleSize,
            fontWeight: "bold",
            color: Colors.core.text,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Search
        </Text>

        <View
          style={{
            flex: 1,
            marginTop: topSpacing,
            marginHorizontal: horizontalMargin,
          }}
        >
          <CustomSearchBar
            query={query}
            setQuery={setQuery}
            placeholder="Search"
          />

          {searchStatus === "loading" ? (
            <SearchSuggestions isLoading={true} />
          ) : (
            <SearchSuggestions data={optimizedSearch} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
