import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FavoriteServices from "../../services/FavoriteService/FavoriteService";
const initialState = {
  favorite: [],
  error: null,
  loading: false,
};
export const getFavorite = createAsyncThunk(
  "fav/getFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await FavoriteServices.GetUserInterest();
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorite = [...state.favorite, action.payload];
    },
    removeFavorite: (state, action) => {
      state.favorite = state.favorite.filter((fav) => fav !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // get favorite keywords of user
    builder.addCase(getFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.favorite = [action.payload.result];
    });
    builder.addCase(getFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
