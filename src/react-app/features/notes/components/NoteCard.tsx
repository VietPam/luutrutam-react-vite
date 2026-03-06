import { Card, CardContent, Stack, Typography, IconButton, Box } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch } from "react-redux"
import { openModal } from "../../modal/modalSlice"
import { Note } from "../types/note"

type Props = {
  note: Note
  onCopy: (content: string) => void
  onDelete: (id: string) => void
}

function NoteCard({ note, onCopy, onDelete }: Props) {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(
      openModal({
        type: "confirm",
        props: {
          message: "Delete this note?",
          onConfirm: () => onDelete(note.id)
        }
      })
    )
  }

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", flex: 1 }}
          >
            {note.text}
          </Typography>

          <Box>
            <IconButton color="primary" onClick={() => onCopy(note.text)}>
              <ContentCopyIcon />
            </IconButton>

            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default NoteCard