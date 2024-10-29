import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
  ProductDetails: [],
};

// for add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);
// for fetch all Products
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);

// for update cart Details
export const updateCartItems = createAsyncThunk(
  "cart/updateCartItems",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

// Delete the kart details
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.ProductDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload.data);
      })
      .addCase(addToCart.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload.data);
      })
      .addCase(fetchCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload.data);
      })
      .addCase(updateCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        console.log("Cart Items Before Update: ", state.cartItems);
        console.log("Payload:", action.payload);
        state.isLoading = false;
        const updatedCartItems = Array.isArray(state.cartItems)
          ? state.cartItems.map((item) =>
              item.productId === action.payload.productId
                ? { ...item, quantity: action.payload.quantity }
                : item
            )
          : [];

        console.log("Updated Cart Items: ", updatedCartItems);

        state.cartItems = updatedCartItems;
        console.log("state.items", state.cartItems);
      })

      .addCase(deleteCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      });
  },
});

export const { setProductDetails } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
