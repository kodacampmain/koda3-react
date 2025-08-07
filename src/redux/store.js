import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  REGISTER,
  FLUSH,
  PAUSE,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterReducer from "./slices/counterSlice";
import shoppingReducer from "./slices/shoppingSlice";
import todoReducer from "./slices/todoSlice";
import pokemonReducer from "./slices/pokemonSlice";

const persistConfig = {
  key: "koda3:redux",
  storage,
  blacklist: ["counter"],
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    counter: counterReducer,
    shopping: shoppingReducer,
    todo: todoReducer,
    pokemon: pokemonReducer,
  }),
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, REHYDRATE, REGISTER, FLUSH, PAUSE, PURGE],
      },
    });
  },
  devTools: import.meta.env.VITE_ENVIRONMENT === "development",
});

export const persistedStore = persistStore(store);

export default store;
