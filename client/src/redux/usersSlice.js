import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const ClearUser = () => {
  return { type: "users/ClearUser" };
};

export const { SetUser } = usersSlice.actions;
export default usersSlice.reducer;
