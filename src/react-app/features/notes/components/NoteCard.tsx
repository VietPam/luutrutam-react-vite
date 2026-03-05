import {
	Card,
	CardContent,
	Stack,
	Typography,
	IconButton,
	Box
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
	id: string
	text: string
	onCopy: (text: string) => void
	onDelete: (id: string) => void
}

function NoteCard({ id, text, onCopy, onDelete }: Props) {
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
						sx={{
							whiteSpace: "pre-wrap",
							wordBreak: "break-word",
							flex: 1
						}}
					>
						{text}
					</Typography>

					<Box>
						<IconButton
							color="primary"
							onClick={() => onCopy(text)}
						>
							<ContentCopyIcon />
						</IconButton>

						<IconButton
							color="error"
							onClick={() => onDelete(id)}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	)
}

export default NoteCard