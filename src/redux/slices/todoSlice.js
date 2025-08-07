import { createSlice } from "@reduxjs/toolkit";

const initialState = { todos: [] };
// todo: {title: string;isCompleted: boolean}
const todoSlice = createSlice({
  initialState,
  name: "todo",
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
    },
    editTodo: (state, { payload }) => {
      // {newTitle, idx}
      state.todos[payload.idx].title = payload.newTitle;
    },
    toggleTodo: (state, { payload }) => {
      // {idx}
      state.todos[payload.idx].isCompleted =
        !state.todos[payload.idx].isCompleted;
    },
    deleteTodo: (state, { payload }) => {
      // {idx}
      //   const newTodo = state.todo.filter((_, idx) => idx !== payload.idx);
      //   state.todo = newTodo;
      state.todos.splice(payload.idx, 1);
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions;
