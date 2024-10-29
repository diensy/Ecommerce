import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/products-slice";
import shopProductSlice from "./shop/Product-slice";
import shoppingCartSlice from "./shop/Cart";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shopProducts: shopProductSlice,
    shoppingCart: shoppingCartSlice,
  },
});

export default store;
