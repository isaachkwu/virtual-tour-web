import { configureStore } from "@reduxjs/toolkit";
import hoverSlice from "./hover/hoverSlice";
import locationSlice from "./location/locationSlice";

export const store = configureStore({
  reducer: {
    location: locationSlice,
    hover: hoverSlice,
  }
})