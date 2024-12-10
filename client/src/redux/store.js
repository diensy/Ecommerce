import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/products-slice";
import shopProductSlice from "./shop/Product-slice";
import shoppingCartSlice from "./shop/Cart";
import shoppingAddressSlice from "./shop/Address-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shopProducts: shopProductSlice,
    shoppingCart: shoppingCartSlice,
    shoppingAddress: shoppingAddressSlice,
  },
});

export default store;
