import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  location: "",
  state: "",
  city: "",
  gender: "",
  DateFromStart: "",
  DateFromEnd: "",
  ageGroup: ""
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilter: () => initialState,
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
