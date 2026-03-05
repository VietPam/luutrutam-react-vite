import { useEffect, useState } from "react"
import {
	Container,
	Typography,
	Box,
	Stack,
	Card,
	CardContent,
	TextField,
	Button,
	IconButton,
	Grid
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

import { useDispatch } from "react-redux"
import { showNotification } from "./features/notification/notificationSlice"

import NotificationProvider from "./features/notification/NotificationProvider"

import {
	getNotes,
	addNoteApi,
	deleteNoteApi
} from "./features/notes/api/notesApi"

type Note = {
	id: string
	text: string
}

function App() {
	const dispatch = useDispatch()

	const [notes, setNotes] = useState<Note[]>([])
	const [text, setText] = useState("")
	const [loading, setLoading] = useState(false)

	const loadNotes = async () => {
		try {
			const data = await getNotes()
			setNotes(data.reverse())
		} catch {
			dispatch(
				showNotification({
					message: "Failed to load notes",
					type: "error"
				})
			)
		}
	}

	useEffect(() => {
		loadNotes()
	}, [])

	const addNote = async () => {
		const value = text.trim()
		if (!value) return

		setLoading(true)

		try {
			await addNoteApi(value)

			setText("")
			await loadNotes()

			dispatch(
				showNotification({
					message: "Note added successfully",
					type: "success"
				})
			)
		} catch {
			dispatch(
				showNotification({
					message: "Error adding note",
					type: "error"
				})
			)
		}

		setLoading(false)
	}

	const deleteNote = async (id: string) => {
		if (!confirm("Delete this note?")) return

		try {
			await deleteNoteApi(id)

			await loadNotes()

			dispatch(
				showNotification({
					message: "Note deleted",
					type: "success"
				})
			)
		} catch {
			dispatch(
				showNotification({
					message: "Error deleting note",
					type: "error"
				})
			)
		}
	}

	const copyText = async (value: string) => {
		await navigator.clipboard.writeText(value)

		dispatch(
			showNotification({
				message: "Copied to clipboard",
				type: "info"
			})
		)
	}

	return (
		<>
			<NotificationProvider />

			<Container maxWidth="md" sx={{ mt: 6 }}>
				<Stack spacing={4}>
					<Typography variant="h4">
						Temp Text Board
					</Typography>

					<Card>
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
									onClick={addNote}
									disabled={loading}
								>
									Add Note
								</Button>
							</Stack>
						</CardContent>
					</Card>

					<Box>
						<Typography variant="h6" sx={{ mb: 2 }}>
							Existing Notes
						</Typography>

						<Grid container spacing={2}>
							{notes.map((note) => (
								<Grid size={12} key={note.id}>
									<Card>
										<CardContent>
											<Stack
												direction="row"
												justifyContent="space-between"
												alignItems="center"
												spacing={2}
											>
												<Typography
													sx={{
														whiteSpace: "pre-wrap",
														wordBreak: "break-word",
														flex: 1
													}}
												>
													{note.text}
												</Typography>

												<Box>
													<IconButton
														color="primary"
														onClick={() => copyText(note.text)}
													>
														<ContentCopyIcon />
													</IconButton>

													<IconButton
														color="error"
														onClick={() => deleteNote(note.id)}
													>
														<DeleteIcon />
													</IconButton>
												</Box>
											</Stack>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				</Stack>
			</Container>
		</>
	)
}

export default App