import { configureStore } from "@reduxjs/toolkit";
import missingSlice from "./missingSlice";
import stateCity from "./stateAndCitySlice";
import filterSlice from "./filterSlice";
import loginSlice from "./loginSlice";
export const Store=configureStore({
    reducer:{
        missing:missingSlice,
        stateCity:stateCity,
        filter:filterSlice,
        login:loginSlice
    }
})