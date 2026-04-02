import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, retryFetch } from '../utils/mockData';

// Async thunk to fetch products with retry logic and fallback to mock data
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Try to fetch from FakeStore API with retry logic
      const data = await retryFetch('https://fakestoreapi.com/products?limit=100', 3);
      return data;
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message);
      // Fallback to mock data when API fails
      return MOCK_PRODUCTS;
    }
  }
);

// Async thunk to fetch single product with retry logic and fallback
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      // Try API first with retry
      const data = await retryFetch(`https://fakestoreapi.com/products/${id}`, 3);
      return data;
    } catch (error) {
      console.warn('Could not fetch product from API, using mock data:', error.message);
      // Fallback to mock data
      const mockProduct = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
      if (!mockProduct) {
        return rejectWithValue('Product not found');
      }
      return mockProduct;
    }
  }
);

// Async thunk to fetch categories with retry logic and fallback
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      // Try API first with retry
      const data = await retryFetch('https://fakestoreapi.com/products/categories', 3);
      return data;
    } catch (error) {
      console.warn('Could not fetch categories from API, using mock categories:', error.message);
      // Fallback to mock categories
      return MOCK_CATEGORIES;
    }
  }
);

const initialState = {
  items: [],
  selectedProduct: null,
  categories: [],
  loading: false,
  loadingDetail: false,
  error: null,
  errorDetail: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearDetailError: (state) => {
      state.errorDetail = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedProduct = action.payload;
        state.errorDetail = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearError, clearDetailError, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
