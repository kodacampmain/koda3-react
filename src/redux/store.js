import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import shoppingReducer from "./slices/shoppingSlice";
import todoReducer from "./slices/todoSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    shopping: shoppingReducer,
    todo: todoReducer,
  },
});

export default store;
