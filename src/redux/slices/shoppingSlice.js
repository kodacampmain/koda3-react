import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const shoppingSlice = createSlice({
  initialState,
  name: "shopping",
  reducers: {
    addToCart: (state, { payload }) => {
      const index = state.cart.findIndex((product) => {
        return product.name === payload.product.name;
      });
      if (index === -1) {
        state.cart.push(payload.product);
      }
    },
    removeFromCart: (state, { payload }) => {
      const index = state.cart.findIndex((product) => {
        return product.name === payload.productName;
      });
      state.cart.splice(index, 1);
    },
  },
});

export const { addToCart, removeFromCart } = shoppingSlice.actions;
export default shoppingSlice.reducer;
