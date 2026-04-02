import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: localStorage.getItem('searchTerm') || '',
  selectedCategory: localStorage.getItem('selectedCategory') || '',
  selectedSize: localStorage.getItem('selectedSize') || '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      localStorage.setItem('searchTerm', action.payload);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      localStorage.setItem('selectedCategory', action.payload);
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
      localStorage.setItem('selectedSize', action.payload);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.selectedSize = '';
      localStorage.removeItem('searchTerm');
      localStorage.removeItem('selectedCategory');
      localStorage.removeItem('selectedSize');
    },
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSelectedSize,
  clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
