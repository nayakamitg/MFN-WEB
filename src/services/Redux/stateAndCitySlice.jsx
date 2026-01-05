import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getState = createAsyncThunk(
  "getState",
  async (_,{rejectWithValue}) => {
    try {
      const res = await axios.get("https://goplanup.dishaayein.com/api/State");
      return res.data;
    } catch (error) {
        rerurn("Somthing went wrong");
    }
  }
);
export const getCity = createAsyncThunk(
  "getCity",
  async (_,{rejectWithValue}) => {
    try {
      const res = await axios.get("https://goplanup.dishaayein.com/api/City");
      return res.data;
    } catch (error) {
       return("Somthing went wrong");
    }
  }
);

const stateAndCitySlice = createSlice({
  name: "stateCity",
  initialState: {
    STATE: [],
    CITY: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getState.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getState.pending, (state,action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.STATE = action.payload;
      })
      builder
      .addCase(getCity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getCity.pending, (state,action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.CITY = action.payload;
      })
  },
});

export default stateAndCitySlice.reducer;
