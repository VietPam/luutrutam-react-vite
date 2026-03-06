export type Note = {
  id: string
  text: string
  created_at?: string
  deleted_at?: string | null // Thêm dòng này để sửa lỗi ts(2339)
}