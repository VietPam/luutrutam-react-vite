import NoteCard from "./NoteCard"
import { Note } from "../types/note"


type NotesListProps = {
  notes: Note[]
  onCopy: (content: string) => void
  onDelete: (id: string) => void
}

export default function NotesList({ notes, onCopy, onDelete }: NotesListProps) {
  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onCopy={onCopy}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}