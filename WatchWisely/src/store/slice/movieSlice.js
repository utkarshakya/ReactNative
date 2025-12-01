import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";

const { TMDB_TOKEN, TMDB_BASE_URL } = Constants.expoConfig?.extra

export const fetchTopRatedMovies = createAsyncThunk(
    "movie/fetchTopRated",
    async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get(
                `${TMDB_BASE_URL}/movie/top_rated`, {
                headers: {
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            },
            );

            return response?.data?.results;
        } catch (error) {
            const errorDetails = {
                message: error.message,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data,
                } : null,
                request: error.request ? {
                    method: error.config?.method,
                    url: error.config?.url,
                } : null,
            };

            return rejectWithValue(errorDetails);
        }
    }
);

export const fetchPopularMovies = createAsyncThunk(
    "movie/fetchPopular",
    async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get(
                `${TMDB_BASE_URL}/movie/popular`, {
                headers: {
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            },
            );

            return response?.data?.results;
        } catch (error) {
            const errorDetails = {
                message: error.message,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data,
                } : null,
                request: error.request ? {
                    method: error.config?.method,
                    url: error.config?.url,
                } : null,
            };

            return rejectWithValue(errorDetails);
        }
    }
);

export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Top-Rated Movies
            .addCase(fetchTopRatedMovies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchTopRatedMovies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Popular Movies
            .addCase(fetchPopularMovies.pending, (state) => {
                state.status = "loading"
            }).addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload
            }).addCase(fetchPopularMovies.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload || action.error.message
            })
    },
});

export const movieReducer = moviesSlice.reducer;
export const selectMovies = (state) => state.movies;