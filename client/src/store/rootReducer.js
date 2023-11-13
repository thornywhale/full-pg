import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import toDoReducer from "./toDoSlice";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: toDoReducer,
  users: usersReducer,
  // tasks: taskReducer,
});

export default rootReducer;
