/* FILE: src/react-app/features/modal/modals/ConfirmModal.tsx */
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../modalSlice";

type Props = {
  title?: string;
  message: string;
  confirmAction: () => { type: string; payload?: any } | any; // Accept a Redux action or thunk
};

export default function ConfirmModal({ title = "Confirm Action", message, confirmAction }: any) {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  const handleConfirm = () => {
    // Execute the logic passed in (usually a function that calls an API or dispatches)
    confirmAction();
    dispatch(closeModal());
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}