import { createSlice } from "@reduxjs/toolkit";
const getLocalStorage = () => {
  let cart = localStorage.getItem("cartItem");
  if (cart) {
    return JSON.parse(localStorage.getItem("cartItem"));
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const item = action.payload;
      const { quantity, id } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id) {
            const newQuantity =
              parseInt(cartItem.quantity) + parseInt(quantity);
            return { ...cartItem, quantity: newQuantity };
          } else {
            return cartItem;
          }
        });
        state.cart = tempCart;
      } else {
        state.cart = [...state.cart, item];
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cart));
    },
    removecart: (state, action) => {
      const id = action.payload;
      const newcart= state.cart.filter((item)=>item.id !== id)
      state.cart=newcart
      localStorage.setItem("cartItem", JSON.stringify(state.cart));


    },
  },
});
export const { updateCart, removecart } = cartSlice.actions;

export default cartSlice.reducer;
