import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 100,
    step: 1,
  },
  reducers: {
    addCount(state, action) {
      console.dir(state, action);
      state.count += action.payload.step;
    },
    subCount(state, action) {
      state.count -= action.payload.step;
    },
    setStep(state, action) {
      state.step = action.payload.step;
    },
  },
});

export const { addCount, subCount, setStep } = counterSlice.actions;

export default counterSlice.reducer;
