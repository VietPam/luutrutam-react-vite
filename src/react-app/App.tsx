/* FILE: src/react-app/App.tsx */
import { useEffect } from "react"
import { Container, Stack } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "./features/notification/notificationSlice"
import NotificationProvider from "./features/notification/NotificationProvider"
import NotesList from "./features/notes/components/NotesList"
import ModalManager from "./features/modal/ModalManager"
import CreateNoteArea from "./features/notes/components/CreateNoteArea"
import AppHeader from "./components/layout/AppHeader"
import { RootState, AppDispatch } from "./app/store"
import { fetchNotes } from "./features/notes/notesSlice"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: notes } = useSelector((state: RootState) => state.notes)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value)
    dispatch(showNotification({ message: "Copied to clipboard", type: "info" }))
  }

  return (
    <>
      <NotificationProvider />
      <ModalManager />

      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Stack spacing={4}>
          <AppHeader />
          <CreateNoteArea /> 
          <NotesList notes={notes} onCopy={copyText} />
        </Stack>
      </Container>
    </>
  )
}

export default App