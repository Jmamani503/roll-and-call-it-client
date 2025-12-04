import { useState, type ReactNode } from "react";
import { ModalContext } from "./modal-context";

export const ModalProvider = ({children}: {children: ReactNode}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false)
    setContent(null)
  }

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}