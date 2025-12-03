import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const { AUTH_API_URL } = Constants.expoConfig?.extra;

export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async (idToken, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${AUTH_API_URL}/google`, { idToken });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Google login failed"
            );
        }
    }
);

export const logoutWithGoogle = createAsyncThunk(
    "auth/logoutWithGoogle",
    async (_, { rejectWithValue }) => {
        try {
            await GoogleSignin.signOut();
            return null;
        } catch (error) {
            console.error("Error signing out from Google:", error);
            return null;
        }
    }
);

// Sample function for alter on Register click. It is to check if the backend is called or not
export const register = createAsyncThunk(
    'auth/register',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${AUTH_API_URL}/register`, credentials);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
)

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.tokens.accessToken;
                state.refreshToken = action.payload.tokens.refreshToken;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutWithGoogle.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.error = null;
            });
    },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice;
