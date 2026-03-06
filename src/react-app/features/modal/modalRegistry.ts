/* FILE: src/react-app/features/modal/modalRegistry.ts */
import ConfirmModal from "./modals/ConfirmModal";

export const MODAL_COMPONENTS = {
  confirm: ConfirmModal,
  // Add new modals here:
  // settings: SettingsModal,
} as const;

export type ModalType = keyof typeof MODAL_COMPONENTS;