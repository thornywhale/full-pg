import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const USERS_SLICE_NAME = "users";

export const getUsers = createAsyncThunk(
  `${USERS_SLICE_NAME}/getUsers`,
  async (params, thunkAPI) => {
    try {
      const data = await fetch(
        "https://randomuser.me/api/?results=" + params.res
      ).then((response) => response.json());
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState: {
    users: [],
    error: null,
    isFetching: false,
  },
  reducers: {
    loadUsers(state, action) {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
