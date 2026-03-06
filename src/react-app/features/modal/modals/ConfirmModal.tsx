import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { closeModal } from "../modalSlice"

type Props = {
  message: string
  onConfirm: () => void
}

export default function ConfirmModal({ message, onConfirm }: Props) {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleConfirm = () => {
    onConfirm()
    dispatch(closeModal())
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}