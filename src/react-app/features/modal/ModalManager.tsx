import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import ConfirmModal from "./modals/ConfirmModal"

export default function ModalManager() {
  const { type, props } = useSelector((state: RootState) => state.modal)

  if (!type) return null

  if (type === "confirm") {
    return <ConfirmModal {...props} />
  }

  return null
}