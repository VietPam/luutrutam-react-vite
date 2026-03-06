/* FILE: src/react-app/app/store.ts */
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notification/notificationSlice";
import modalReducer from "../features/modal/modalSlice";
import notesReducer from "../features/notes/notesSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    modal: modalReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;