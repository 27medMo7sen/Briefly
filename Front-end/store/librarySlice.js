import { createSlice } from "@reduxjs/toolkit";

export const librarySlice = createSlice({
  name: "library",
  initialState: {
    items: [],
    selectedItem: null,
  },
  reducers: {
    pushItem(state, action) {
      const newItems = [...state.items, action.payload];
      state.items = newItems;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const libraryActions = librarySlice.actions;
