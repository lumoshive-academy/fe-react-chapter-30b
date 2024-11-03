import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import asyncReducer from "./asyncReducer";

// Create Store with Thunk Middleware
const store = createStore(asyncReducer, applyMiddleware(thunk));

export default store;
