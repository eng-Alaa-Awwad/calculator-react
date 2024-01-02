import { useReducer } from "react";
import "./style.css";

function reducer(state, action) {
  switch (action.type) {
    case "add-digit":
      if (action.payload === "0" && state.currentOperand === "0") return state;

      if (action.payload === "." && state.currentOperand.indexOf(".") !== -1) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload}`,
      };
    case "choose-operation":
      if (state.currentOperand === "" && state.previousOperand === "") {
        return state;
      }
      if (state.currentOperand === "") {
        return state;
      }
      if (state.previousOperand === "") {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      }
      return {
        ...initiState,
        operation: action.payload,
        previousOperand: evaluat(state),
      };

    case "clear":
      return { ...initiState };
    case "delete-digit":
      if (state.currentOperand === "") return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: "" };

      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
    case "evaluate":
      if (state.currentOperand === "" || state.previousOperand === "")
        return state;
      return { ...initiState, currentOperand: evaluat(state) };
    default:
      return new Error("wrong");
  }
}

function evaluat({ currentOperand, previousOperand, operation }) {
  const pre = parseFloat(previousOperand);
  const cur = parseFloat(currentOperand);
  if (isNaN(cur) || isNaN(pre)) return "";

  switch (operation) {
    case "+":
      return String(pre + cur);
    case "-":
      return String(pre - cur);
    case "*":
      return String(pre * cur);
    case "/":
      return String(pre / cur);
    default:
      new Error("Wrong");
  }
}

const initiState = { currentOperand: "", previousOperand: "", operation: "" };
function App() {
  const [state, dispatch] = useReducer(reducer, initiState);
  const { currentOperand, previousOperand, operation } = state;
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand}
          {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: "clear" })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: "delete-digit" })}>DEL</button>
      <button
        onClick={() => dispatch({ type: "choose-operation", payload: "/" })}
      >
        /
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 1 })}>
        1
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 2 })}>
        2
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 3 })}>
        3
      </button>
      <button
        onClick={() => dispatch({ type: "choose-operation", payload: "*" })}
      >
        *
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 4 })}>
        4
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 5 })}>
        5
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 6 })}>
        6
      </button>
      <button
        onClick={() => dispatch({ type: "choose-operation", payload: "+" })}
      >
        +
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 7 })}>
        7
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 8 })}>
        8
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: 9 })}>
        9
      </button>
      <button
        onClick={() => dispatch({ type: "choose-operation", payload: "-" })}
      >
        -
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: "." })}>
        .
      </button>
      <button onClick={() => dispatch({ type: "add-digit", payload: "0" })}>
        0
      </button>
      <button
        className="span-two"
        onClick={() => dispatch({ type: "evaluate" })}
      >
        =
      </button>
    </div>
  );
}

export default App;
