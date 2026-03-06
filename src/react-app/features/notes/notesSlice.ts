/* FILE: src/react-app/features/notes/notesSlice.ts */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getNotes, addNoteApi, deleteNoteApi } from "./api/notesApi"
import { Note } from "./types/note"
import { showNotification } from "../notification/notificationSlice"

// THUNKS: Handling API Logic
export const fetchNotes = createAsyncThunk("notes/fetchAll", async (_, { dispatch }) => {
  try {
    const data = await getNotes()
    return data.reverse()
  } catch (error) {
    dispatch(showNotification({ message: "Failed to load notes", type: "error" }))
    throw error
  }
})

export const createNote = createAsyncThunk("notes/create", async (text: string, { dispatch }) => {
  try {
    await addNoteApi(text)
    dispatch(showNotification({ message: "Note added successfully", type: "success" }))
    dispatch(fetchNotes()) // Refresh list
    return text
  } catch (error) {
    dispatch(showNotification({ message: "Error adding note", type: "error" }))
    throw error
  }
})

export const removeNote = createAsyncThunk("notes/remove", async (id: string, { dispatch }) => {
  try {
    await deleteNoteApi(id)
    dispatch(showNotification({ message: "Note deleted", type: "success" }))
    return id // Return ID to remove from state locally
  } catch (error) {
    dispatch(showNotification({ message: "Error deleting note", type: "error" }))
    throw error
  }
})

interface NotesState {
  items: Note[]
  loading: boolean
}

const notesSlice = createSlice({
  name: "notes",
  initialState: { items: [], loading: false } as NotesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => { state.loading = true })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchNotes.rejected, (state) => { state.loading = false })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.items = state.items.filter(note => note.id !== action.payload)
      })
  }
})

export default notesSlice.reducer