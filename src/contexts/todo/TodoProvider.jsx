import { useReducer } from "react";
import { todoContext as TodoContext } from "./todoContext.js";

// {title: string;isCompleted: boolean}
const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      for (let todo of state) {
        // todo = action.value
        if (todo.title === action.value.title) {
          return state;
        }
      }
      return [...state, action.value];

    case "TOGGLE_TODO":
      return state.map((todo) => {
        // todo.title = action.value
        if (todo.title === action.value) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });

    case "DELETE_TODO":
      return state.filter((todo) => {
        // todo.title = action.value
        return todo.title !== action.value;
      });
    default:
      break;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
