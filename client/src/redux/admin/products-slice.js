import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};
export const addNewProduct = createAsyncThunk(
  "/products/addnewproducts",
  async (FormData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      FormData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return result?.data;
  }
);
export const fetchAllProduct = createAsyncThunk(
  "/products/fetchallproduct",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/fetch"
    );
    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
