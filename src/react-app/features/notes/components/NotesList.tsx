import NoteCard from "./NoteCard"
import { Note } from "../types/note"


type NotesListProps = {
  notes: Note[]
  onCopy: (content: string) => void
}

export default function NotesList({ notes, onCopy, }: NotesListProps) {
  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onCopy={onCopy}
        />
      ))}
    </div>
  )
}