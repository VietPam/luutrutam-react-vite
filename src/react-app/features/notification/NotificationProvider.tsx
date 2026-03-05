import { Snackbar, Alert } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { closeNotification } from "./notificationSlice"

export default function NotificationProvider() {
  const dispatch = useDispatch()

  const { open, message, type } = useSelector(
    (state: RootState) => state.notification
  )

  const handleClose = () => {
    dispatch(closeNotification())
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}