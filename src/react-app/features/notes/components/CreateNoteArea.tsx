/* FILE: src/react-app/features/notes/components/CreateNoteArea.tsx */
import { Card, CardContent, Stack, TextField, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

interface CreateNoteAreaProps {
  text: string
  setText: (val: string) => void
  onAdd: () => void
  loading: boolean
}

export default function CreateNoteArea({ text, setText, onAdd, loading }: CreateNoteAreaProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <TextField
            multiline
            minRows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste content here..."
            fullWidth
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            disabled={loading}
            disableElevation
          >
            {loading ? "Adding..." : "Add Note"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}