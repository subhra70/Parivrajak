import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    id: 0,
    name: "",
    mobile: "",
    organization: "",
    email: "",
    location: "",
  },
};

const orgInfoSlice = createSlice({
  name: "orgInfo",
  initialState,
  reducers: {
    loadData: (state, action) => {
      state.userInfo.id = action.payload.id;
      state.userInfo.name = action.payload.username;
      state.userInfo.mobile = action.payload.phone;
      state.userInfo.organization = action.payload.organization;
      state.userInfo.email = action.payload.email;
      state.userInfo.location = action.payload.location;
    },
    updateData: (state, action) => {
      state.userInfo.name = action.payload.name;
      state.userInfo.mobile = action.payload.phone;
      state.userInfo.organization = action.payload.organization;
      state.userInfo.location = action.payload.loc;
    },
  },
});
export const { loadData, updateData } = orgInfoSlice.actions;
export default orgInfoSlice.reducer;
