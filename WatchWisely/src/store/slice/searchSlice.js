import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";

const { TMDB_TOKEN, TMDB_BASE_URL } = Constants.expoConfig?.extra;

export const fetchSearch = createAsyncThunk(
  "movies/search",
  async (query, { signal, rejectWithValue }) => {
    const options = {
      method: "GET",
      url: `${TMDB_BASE_URL}/search/movie?query=${query}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`
      },
      signal
    };

    try {
      const response = await axios(options);
      return response?.data?.results ?? [];
    } catch (error) {
      if (signal?.aborted || error?.name === "CanceledError") {
        return rejectWithValue({ aborted: true });
      }
      console.log(error);
      return rejectWithValue(error?.response?.data ?? error?.message);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
    searchStatus: "idle",
    searchError: null
  },
  reducers: {
    clearSearch: (state) => {
      state.search = [];
      state.searchStatus = "idle";
      state.searchError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.searchStatus = "loading";
        state.searchError = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.search = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        if (action.payload?.aborted) {
          state.searchStatus = "idle";
          return;
        }
        state.searchStatus = "failed";
        state.searchError = action.payload ?? action.error?.message ?? null;
      });
  }
});

export const { clearSearch } = searchSlice.actions;

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
