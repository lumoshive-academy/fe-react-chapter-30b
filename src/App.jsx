import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "./redux/asyncReducer";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default App;
