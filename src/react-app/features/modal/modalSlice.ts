/* FILE: src/react-app/features/modal/modalSlice.ts */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "./modalRegistry";

interface ModalState {
  type: ModalType | null;
  props: {
    title?: string;
    message?: string;
    itemId?: string; // Data ID
    actionType?: "DELETE_NOTE" | "ARCHIVE_NOTE"; // Enum-style strings
  };
}

const initialState: ModalState = {
  type: null,
  props: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: ModalType; props?: any }>) => {
      state.type = action.payload.type;
      state.props = action.payload.props || {};
    },
    closeModal: (state) => {
      state.type = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;