import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IService } from "@/types";

interface CartSlice {
  service: IService;
}

const initialState: CartSlice = {
  service: {} as IService,
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IService>) => {
      state.service = action.payload;
    },
  },
});

export const { addToCart } = counterSlice.actions;

export const selectCount = (state: RootState) => state.cart.service;

export default counterSlice.reducer;
