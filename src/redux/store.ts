import { configureStore } from "@reduxjs/toolkit";
import openCloseEditModalReducer from "./slices/openCloseEditModalSlice";

const store = configureStore({
  reducer: {
    openClose: openCloseEditModalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
