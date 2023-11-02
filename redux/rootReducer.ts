import { baseApi } from "./api/baseApi";
import authSlice from "./features/authSlice";
import cartSlice from "./features/cartSlice";

export const reducer = {
  cart: cartSlice,
  auth: authSlice,
  [baseApi.reducerPath]: baseApi.reducer,
  
};
