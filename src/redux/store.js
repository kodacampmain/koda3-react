import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import shoppingReducer from "./slices/shoppingSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    shopping: shoppingReducer,
  },
});

export default store;
