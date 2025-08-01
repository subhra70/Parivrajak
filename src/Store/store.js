import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import destReducer from "./destSlice"
import React from "react";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dest:destReducer // state.auth will contain authReducer state
  }
});

export default store;
