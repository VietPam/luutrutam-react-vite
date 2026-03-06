const API_URL = "https://luutrutam-api-v3.20522153.workers.dev/notes"

export const getNotes = async () => {
	const res = await fetch(API_URL)
	if (!res.ok) {
		throw new Error("Failed to fetch notes")
	}
	return res.json()
}

export const addNoteApi = async (text: string) => {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ action: "add", text })
	})

	if (!res.ok) {
		throw new Error("Failed to add note")
	}
}

export const deleteNoteApi = async (id: string) => {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ action: "delete", id })
	})

	if (!res.ok) {
		throw new Error("Failed to delete note")
	}
}
