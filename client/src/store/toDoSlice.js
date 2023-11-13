import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const toDoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
    mode: "all",
    quantity: 1,
  },
  reducers: {
    createTask(state, action) {
      const { body, deadline } = action.payload;
      const newTask = {
        id: uuidv4(),
        body: body,
        done: false,
        deadline: deadline,
      };
      state.tasks.push(newTask);
    },
    deleteTask(state, action) {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((task) => id !== task.id);
    },
    setDoneTask(state, action) {
      const { id } = action.payload;
      state.tasks = state.tasks.map((task) =>
        id === task.id ? { ...task, done: !task.done } : task
      );
    },
    setMode(state, action) {
      const { mode } = action.payload;
      state.mode = mode;
    },
    setQuantity(state, action) {
      const { quantity } = action.payload;
      state.mode = quantity;
    },
  },
});

export const { createTask, deleteTask, setDoneTask, setMode, setQuantity } =
  toDoSlice.actions;
export default toDoSlice.reducer;
