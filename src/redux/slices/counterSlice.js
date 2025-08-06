import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0, isNumber: true };
const counterSlice = createSlice({
  initialState,
  name: "counter",
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    reset: (state) => {
      state.count = 0;
    },
    random: (state) => {
      state.count = parseInt(Math.random() * 100);
    },
  },
});
// export action
export const { increment, decrement, reset, random } = counterSlice.actions;
// export reducer
export default counterSlice.reducer;
