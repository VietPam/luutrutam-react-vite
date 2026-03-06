import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getNotes, addNoteApi, deleteNoteApi } from "./api/notesApi"
import { Note } from "./types/note"
import { showNotification } from "../notification/notificationSlice"

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
    dispatch(fetchNotes())
    return text
  } catch (error) {
    dispatch(showNotification({ message: "Error adding note", type: "error" }))
    throw error
  }
})

export const removeNote = createAsyncThunk("notes/remove", async (id: string, { dispatch }) => {
  try {
    await deleteNoteApi(id)
    dispatch(showNotification({ message: "Note moved to trash", type: "success" }))
    return id 
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
      // Xử lý lấy danh sách
      .addCase(fetchNotes.pending, (state) => { 
        state.loading = true 
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchNotes.rejected, (state) => { 
        state.loading = false 
      })
      
      // Gộp lại thành một lần gọi duy nhất cho removeNote.fulfilled
      .addCase(removeNote.fulfilled, (state, action) => {
        // Cập nhật local state: xóa note ra khỏi danh sách hiển thị
        state.items = state.items.filter(note => note.id !== action.payload)
      })
  }
})

export default notesSlice.reducer