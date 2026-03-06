/* FILE: src/react-app/features/modal/modalRegistry.ts */
import ConfirmModal from "./modals/ConfirmModal";

export const MODAL_COMPONENTS = {
  confirm: ConfirmModal,
} as const;

export type ModalType = keyof typeof MODAL_COMPONENTS;

// This helper extracts the props from the components in the registry
export type ModalProps<T extends ModalType> = React.ComponentProps<typeof MODAL_COMPONENTS[T]>;