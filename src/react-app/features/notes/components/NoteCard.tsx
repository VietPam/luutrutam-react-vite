import { Card, CardContent, Stack, Typography, IconButton, Box } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { openModal } from "../../modal/modalSlice";
import { Note } from "../types/note";

type Props = {
  note: Note;
  onCopy: (content: string) => void;
};

function NoteCard({ note, onCopy }: Props) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(
      openModal({
        type: "confirm",
        props: {
          title: "Delete Note",
          message: "Move this note to trash?",
          itemId: note.id,
          actionType: "DELETE_NOTE"
        },
      })
    );
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", flex: 1 }}>
            {note.text}
          </Typography>
          <Box>
            <IconButton onClick={() => onCopy(note.text)}>
              <ContentCopyIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NoteCard;