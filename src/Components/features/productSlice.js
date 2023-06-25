import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.products = action.payload;
      console.log(state.products);
    },
  },
});
export const { updateProduct } = productSlice.actions;

export default productSlice.reducer;
