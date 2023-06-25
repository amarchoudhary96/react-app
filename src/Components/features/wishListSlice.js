import { createSlice } from "@reduxjs/toolkit";
const getLocalStorage = () => {
  let wishlistitem = localStorage.getItem('wishlist')
  if (wishlistitem) {
    return JSON.parse(localStorage.getItem('wishlist'))
  } else {
    return []
  }
}
const initialState = {
  wishlist: getLocalStorage(),
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updatewishlist: (state, action) => {
     const items = action.payload 
      const existingItem = state.wishlist.find((i) => i.id === items.id);
      if (existingItem) {
        return
      }
      else{
        state.wishlist = [...state.wishlist,items]
      }
      // state.wishlist = [...state.wishlist, action.payload];
      // console.log(state.wishlist);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));

    },
    removeitem: (state, action) => {
      console.log(action.payload);
      const wishList = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      state.wishlist = wishList;
      localStorage.setItem('wishlist',JSON.stringify(state.wishlist))
    },
   
    
  },
});
export const { updatewishlist, removeitem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
