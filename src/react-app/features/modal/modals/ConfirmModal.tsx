/* FILE: src/react-app/features/modal/modals/ConfirmModal.tsx */
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { closeModal } from "../modalSlice"
import { removeNote } from "../../notes/notesSlice"
import { AppDispatch } from "../../../app/store"

interface ConfirmModalProps {
  title?: string
  message?: string
  itemId: string
  actionType: "DELETE_NOTE"
}

export default function ConfirmModal({ 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  itemId, 
  actionType 
}: ConfirmModalProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleClose = () => dispatch(closeModal())

  const handleConfirm = async () => {
    if (actionType === "DELETE_NOTE") {
      // Logic is central: the thunk handles API, Notifications, and State
      await dispatch(removeNote(itemId))
    }
    dispatch(closeModal())
  }

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleConfirm} disableElevation>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}