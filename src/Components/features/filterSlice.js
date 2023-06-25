import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterproduct: [],
  allproduct: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updatefilter: (state, action) => {
      state.filterproduct = action.payload;
      state.allproduct = action.payload;
    },
    updateselect: (state, action) => {
      let tempProducts = [...state.filterproduct];
      const select = action.payload;
      console.log(select);
      if (select === "price-lowest") {
        tempProducts.sort((a, b) => a.price - b.price);
      }
      state.filterproduct = tempProducts;
      if (select === "price-highest") {
        tempProducts.sort((a, b) => b.price - a.price);
      }
      state.filterproduct = tempProducts;
      if (select === "name-a") {
        tempProducts.sort((a, b) =>
          a.productTitle.localeCompare(b.productTitle)
        );
      }
      state.filterproduct = tempProducts;
      if (select === "name-z") {
        tempProducts.sort((a, b) =>
          b.productTitle.localeCompare(a.productTitle)
        );
      }
      state.filterproduct = tempProducts;
    },
    updatesearch: (state, action) => {
      const text = action.payload;
      if (text) {
        let tempProducts = [...state.filterproduct];

        tempProducts = tempProducts.filter((product) =>
          product.title.toLowerCase().startsWith(text)
        );
        state.filterproduct = tempProducts;
      } else {
        state.filterproduct = state.allproduct;
      }
    },
  },
});

export const { updatefilter, updateselect, updatesearch } = filterSlice.actions;

export default filterSlice.reducer;
