import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/cart/getCart/${userId}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/cart/addToCart",
        data
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const syncCartToDB = createAsyncThunk(
  "cart/syncCartToDB",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/cart/syncCart",
        data
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    increaseQty: (state, action) => {
      const item = state.items.find((item) => item.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((item) => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;

        const existing = state.items.find(
          (item) => item.productId === action.payload.productId
        );

        if (existing) {
          existing.quantity = action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { increaseQty, decreaseQty, removeItem } = cartSlice.actions;
export default cartSlice.reducer;