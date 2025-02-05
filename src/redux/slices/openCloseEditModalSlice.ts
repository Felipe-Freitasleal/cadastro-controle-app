import { createSlice } from "@reduxjs/toolkit";

interface OpenCloseModalEditState {
  value: boolean;
}

const initialState: OpenCloseModalEditState = {
  value: false,
};

export const openCloseEditModalSlice = createSlice({
  name: "openCloseEditModal",
  initialState,
  reducers: {
    openEditModal: (state) => {
      state.value = true;
    },
    closeEditModal: (state) => {
      state.value = false;
    },
  },
});

export const { openEditModal, closeEditModal } =
  openCloseEditModalSlice.actions;

export default openCloseEditModalSlice.reducer;
