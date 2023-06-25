import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Components/features/userSlice"
import productsReducer from "./Components/features/productSlice"
import categoryReducer from "./Components/features/slideSlice"
import cartReducer from "./Components/features/cartSlice"
import wishlistreducer from "./Components/features/wishListSlice";
import filterreducer from "./Components/features/filterSlice";

export const Store = configureStore({
  reducer: {
    user: userReducer,
    product:productsReducer,
    category:categoryReducer,
    cart:cartReducer,
    wishlist:wishlistreducer,
    filter:filterreducer,
  },
});
