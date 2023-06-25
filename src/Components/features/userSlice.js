import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, {payload}) => {
      state.user = payload;
      console.log(state.user);
    },
  },
});
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
