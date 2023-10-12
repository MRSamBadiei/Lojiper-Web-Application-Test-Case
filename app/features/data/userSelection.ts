"use client";
import { I_SETDATA } from "@/app/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const init: I_SETDATA = {
  price: 0,
  seats: [],
  DepartureLocation: "",
  Destination: "",
  Date: 0,
};

const userSelection = createSlice({
  name: "userSelection",
  initialState: init,
  reducers: {
    setData(state, action: PayloadAction<I_SETDATA>) {
      state.price = action.payload.price;
      state.seats = action.payload.seats;
      state.Date = action.payload.Date;
      state.DepartureLocation = action.payload.DepartureLocation;
      state.Destination = action.payload.Destination;
    },
  },
});

export const { setData } = userSelection.actions;
export default userSelection.reducer;
