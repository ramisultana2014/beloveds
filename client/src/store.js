import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./context/userSlice";
const store = configureStore({
  reducer: { user: userSliceReducer },
});
export default store;
