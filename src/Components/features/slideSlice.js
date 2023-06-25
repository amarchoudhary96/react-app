import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  category: "",
};
const slideSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateid: (state, {payload}) => {
    
      state.category = payload;
      console.log(state.category);
    },
  },
});
export const { updateid } = slideSlice.actions;

export default slideSlice.reducer;
