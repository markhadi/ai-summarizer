// Importing necessary utilities and functions from Redux Toolkit
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// Importing our custom API slice created with RTK Query
import { articleApi } from "./article";

// Creating and exporting the Redux store
export const store = configureStore({
  // Combining the reducers. In this case, only the articleApi's reducer is used.
  reducer: {
    // Using the articleApi's generated reducer path as the key,
    // and its reducer function to handle actions related to it
    [articleApi.reducerPath]: articleApi.reducer,
  },

  // Configuring middleware for the Redux store.
  // The getDefaultMiddleware function provides a set of default middlewares recommended by Redux Toolkit.
  // We're also adding our articleApi's custom middleware to the list.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});
