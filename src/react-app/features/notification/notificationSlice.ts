import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type NotificationType = "success" | "error" | "info" | "warning"

type Notification = {
  message: string
  type: NotificationType
}

type NotificationState = {
  open: boolean
  message: string
  type: NotificationType
}

const initialState: NotificationState = {
  open: false,
  message: "",
  type: "info"
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Notification>) => {
      state.open = true
      state.message = action.payload.message
      state.type = action.payload.type
    },
    closeNotification: (state) => {
      state.open = false
    }
  }
})

export const { showNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer