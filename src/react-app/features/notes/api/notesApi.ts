const API_URL = "https://luutrutam-api-v3.20522153.workers.dev/notes"

export const getNotes = async () => {
  const res = await fetch(API_URL)
  if (!res.ok) {
    throw new Error("Failed to fetch notes")
  }
  return res.json()
}

// Đổi từ POST / với action: "add" sang POST /notes/create
export const addNoteApi = async (text: string) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }) // Backend mới không cần field 'action'
  })
  if (!res.ok) {
    throw new Error("Failed to add note")
  }
  return res.json()
}

// Đổi từ POST / với action: "delete" sang POST /notes/delete
export const deleteNoteApi = async (id: string) => {
  const res = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }) // Backend mới thực hiện soft delete
  })
  if (!res.ok) {
    throw new Error("Failed to delete note")
  }
  return res.json()
}