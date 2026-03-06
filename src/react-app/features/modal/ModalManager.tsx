/* FILE: src/react-app/features/modal/ModalManager.tsx */
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { MODAL_COMPONENTS, ModalType } from "./modalRegistry";

export default function ModalManager() {
  const { type, props } = useSelector((state: RootState) => state.modal);

  if (!type) return null;

  const ModalComponent = MODAL_COMPONENTS[type as ModalType];

  if (!ModalComponent) {
    console.warn(`Modal type "${type}" is not registered.`);
    return null;
  }

  // We cast 'props' to 'any' here or to the specific component props 
  // to bypass the strict union mismatch.
  return <ModalComponent {...(props as any)} />;
}