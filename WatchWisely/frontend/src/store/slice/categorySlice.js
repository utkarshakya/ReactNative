import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Constants from "expo-constants";
import axios from "axios";

// Old Scholl
// import getMetroHostIp from "../../utils/getLocalIp";
// export const fetchCategory = createAsyncThunk(
//   "movie/fetchCategory",
//   async () => {
//     const envBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
//     let BASE_URL = envBaseUrl && envBaseUrl.length > 0 ? envBaseUrl : null;

//     if (!BASE_URL && __DEV__) {
//       const hostIp = getMetroHostIp();
//       if (hostIp) {
//         BASE_URL = `http://${hostIp}:3000`;
//       }
//     }

//     const response = await axios.get(`${BASE_URL}/categories`);
//     return response.data;
//   }
// );


const { TMDB_TOKEN, TMDB_BASE_URL } = Constants.expoConfig?.extra;

export const fetchCategory = createAsyncThunk(
  "movies/category",
  async (_, { rejectWithValue }) => {
    const options = {
      method: "GET",
      url: `${TMDB_BASE_URL}`,
      header: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`
      }
    }
    try {
      const response = await axios(options)
      return response?.data?.results ?? []
    } catch (error) {
      console.log(error)
      return rejectWithValue(error?.response?.data ?? error?.message);
    }
  })

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const selectCategory = (state) => state.category;