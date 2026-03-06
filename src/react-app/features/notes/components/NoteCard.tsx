/* FILE: src/react-app/features/notes/components/NoteCard.tsx */
import { Card, CardContent, Stack, Typography, IconButton, Box } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { openModal } from "../../modal/modalSlice";
import { Note } from "../types/note";

type Props = {
  note: Note;
  onCopy: (content: string) => void;
  onDelete: (id: string) => void;
};

function NoteCard({ note, onCopy, onDelete }: Props) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      openModal({
        type: "confirm",
        props: {
          title: "Delete Note",
          message: "Are you sure you want to delete this note? This cannot be undone.",
          // We pass the execution logic here
          confirmAction: () => onDelete(note.id),
        },
      })
    );
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ whiteSpace: "pre-wrap", flex: 1 }}>
            {note.text}
          </Typography>
          <Box>
            <IconButton onClick={() => onCopy(note.text)}><ContentCopyIcon /></IconButton>
            <IconButton color="error" onClick={handleDelete}><DeleteIcon /></IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NoteCard;