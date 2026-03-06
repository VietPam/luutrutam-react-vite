/* FILE: src/react-app/features/modal/ModalManager.tsx */
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { MODAL_COMPONENTS } from "./modalRegistry";

export default function ModalManager() {
  const { type, props } = useSelector((state: RootState) => state.modal);

  if (!type) return null;

  // Dynamically look up the component from our registry
  const ModalComponent = MODAL_COMPONENTS[type];

  if (!ModalComponent) {
    console.warn(`Modal type "${type}" is not registered.`);
    return null;
  }

  return <ModalComponent {...props} />;
}