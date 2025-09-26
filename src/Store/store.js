import { configureStore } from "@reduxjs/toolkit";
import destReducer from "./destSlice"
import orgInfoReducer from "./orgInfoSlice"
import React from "react";

const store = configureStore({
  reducer: {
    dest:destReducer,
    orgProfile:orgInfoReducer
  }
});

export default store;
