/* FILE: src/react-app/App.tsx */
import { useEffect, useState } from "react"
import { Container, Typography, Stack, Card, CardContent, TextField, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./features/notification/notificationSlice"
import NotificationProvider from "./features/notification/NotificationProvider"
import NotesList from "./features/notes/components/NotesList"
import ModalManager from "./features/modal/ModalManager"
import { RootState, AppDispatch } from "./app/store"
import { fetchNotes, createNote } from "./features/notes/notesSlice"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  
  // Get state from Redux instead of local useState
  const { items: notes, loading } = useSelector((state: RootState) => state.notes)
  const [text, setText] = useState("")

  // Load notes on mount via Thunk
  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])

  const handleAddNote = async () => {
    const value = text.trim()
    if (!value) return

    try {
      // Dispatching the thunk handles the API call and state update
      await dispatch(createNote(value)).unwrap()
      setText("")
    } catch {
      // Error notification is handled inside the thunk, 
      // but you can add local logic here if needed
    }
  }

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value)
    dispatch(
      showNotification({ message: "Copied to clipboard", type: "info" })
    )
  }

  return (
    <>
      <NotificationProvider />
      <ModalManager />

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Stack spacing={4}>
          <Typography variant="h4" fontWeight="bold">Temp Text Board</Typography>

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

          {/* We no longer need to pass onDelete down because NoteCard 
              will trigger the Modal, and the Modal will dispatch the Thunk */}
          <NotesList 
            notes={notes} 
            onCopy={copyText} 
            onDelete={() => {}} // This prop is now redundant but kept for component compatibility
          />
        </Stack>
      </Container>
    </>
  )
}

export default App