/* FILE: src/react-app/features/modal/modals/ConfirmModal.tsx */
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../modalSlice";
import { removeNote } from "../../notes/notesSlice";
import { AppDispatch } from "../../../app/store";

type Props = {
  title?: string;
  message: string;
  itemId: string;
  actionType: "DELETE_NOTE";
};

export default function ConfirmModal({ title, message, itemId, actionType }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => dispatch(closeModal());

  const handleConfirm = () => {
    if (actionType === "DELETE_NOTE") {
        dispatch(removeNote(itemId)); // ItemID is the Note ID
    }
    dispatch(closeModal());
    };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{title || "Confirm"}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}