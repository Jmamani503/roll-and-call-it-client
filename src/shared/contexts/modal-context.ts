import { createContext, type ReactNode } from "react";

interface ModalState {
  isOpen: boolean
  content: ReactNode | null
  openModal: (content: ReactNode) => void
  closeModal: () => void
} 

export const ModalContext = createContext<ModalState | undefined>(undefined)