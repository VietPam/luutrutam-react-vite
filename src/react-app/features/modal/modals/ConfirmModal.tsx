/* FILE: src/react-app/features/modal/modals/ConfirmModal.tsx */
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../modalSlice";

type ConfirmModalProps = {
  title?: string;
  message: string;
  itemId: string;
  actionType: "DELETE_NOTE";
  // The logic for 'onDelete' is now internalized or handled via a shared handler
};

export default function ConfirmModal({ title, message, itemId, actionType }: any) {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  const handleConfirm = () => {
    if (actionType === "DELETE_NOTE") {
      // In a real SaaS, you'd dispatch a Thunk here: dispatch(deleteNoteThunk(itemId))
      // For now, we trigger a custom event or use the window/context pattern
      // to keep it simple while remaining serializable.
      window.dispatchEvent(new CustomEvent("MODAL_CONFIRM", { 
        detail: { actionType, itemId } 
      }));
    }
    dispatch(closeModal());
  };

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{title || "Confirm Action"}</DialogTitle>
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