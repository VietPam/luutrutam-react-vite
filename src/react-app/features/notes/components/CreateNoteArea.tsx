/* FILE: src/react-app/features/notes/components/CreateNoteArea.tsx */
import { useState } from "react"
import { Card, CardContent, Stack, TextField, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../app/store"
import { createNote } from "../notesSlice"

export default function CreateNoteArea() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.notes)
  const [text, setText] = useState("")

  const handleAddNote = async () => {
    const value = text.trim()
    if (!value) return

    try {
      // Dispatch thunk trực tiếp tại đây
      await dispatch(createNote(value)).unwrap()
      setText("") // Reset form sau khi thành công
    } catch {
      // Error đã được thunk handle qua notification
    }
  }

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
            onClick={handleAddNote}
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