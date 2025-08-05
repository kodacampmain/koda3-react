import { useReducer } from "react";
import { counterContext as CounterContext } from "./CounterCountex.js";

/**
 * @type {CounterState}
 */
const initialState = { count: 0, isNumber: true };
/**
 * @typedef {Object} CounterState
 * @property {number} count
 * @property {boolean} isNumber
 *
 * @param {CounterState} state
 * @param {Object} action
 * @param {string} action.type
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "RANDOM":
      return { ...state, count: parseInt(Math.random() * 100) };
    default:
      return state;
  }
};

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CounterContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export default CounterProvider;
