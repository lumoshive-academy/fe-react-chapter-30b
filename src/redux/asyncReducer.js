// State
const initialState = {
  todos: [],
  error: null,
};

// Thunk Action
export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      dispatch({ type: "FETCH_TODOS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_TODOS_FAILURE", payload: error.message });
    }
  };
};

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODOS_SUCCESS":
      return {
        ...state,
        todos: action.payload,
        error: null,
      };
    case "FETCH_TODOS_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;
