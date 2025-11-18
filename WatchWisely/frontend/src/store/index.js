import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { categorySlice, moviesSlice, searchSlice, themeSlice } from "./slice";

const rootReducer = combineReducers({
  category: categorySlice.reducer,
  movies: moviesSlice.reducer,
  search: searchSlice.reducer,
  theme: themeSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme"], // only theme will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Optionally ignore specific paths if needed:
        // ignoredActionPaths: ['register', 'rehydrate'],
        // ignoredPaths: ['some.nested.path'],
      },
    }),
});

export const persistor = persistStore(store);