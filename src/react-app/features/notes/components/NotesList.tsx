import NoteCard from "./NoteCard"
import { Note } from "../types/note"

type NotesListProps = {
  notes: Note[]
  onCopy: (content: string) => void
}

export default function NotesList({ notes, onCopy }: NotesListProps) {
  // 1. Lọc: Chỉ lấy những ghi chú chưa bị xóa mềm
  // 2. Sắp xếp: Đưa ghi chú mới nhất (ID lớn nhất hoặc CreatedAt mới nhất) lên đầu
  const activeNotes = [...notes]
    .filter((note) => !note.deleted_at)
    .sort((a, b) => {
      // Vì bạn dùng Date.now().toString() làm ID, chúng ta có thể so sánh ID 
      // để đảm bảo thứ tự chính xác tuyệt đối ngay cả khi trùng giây created_at
      return b.id.localeCompare(a.id);
    });

  return (
    <div className="grid gap-4">
      {activeNotes.length > 0 ? (
        activeNotes.map((note) => (
          <NoteCard key={note.id} note={note} onCopy={onCopy} />
        ))
      ) : (
        <div style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
          No active notes found.
        </div>
      )}
    </div>
  )
}