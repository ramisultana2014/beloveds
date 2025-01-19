import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  requests: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loggedInUser(state, action) {
      state.user = { ...action.payload };
    },
    frRequest(state, action) {
      state.requests = [action.payload];
      //state.requests.push(action.payload);
    },
  },
});

export const { loggedInUser, frRequest } = userSlice.actions;
export default userSlice.reducer;
