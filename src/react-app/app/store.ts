import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "../features/notification/notificationSlice"
import modalReducer from "../features/modal/modalSlice"

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    modal: modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch