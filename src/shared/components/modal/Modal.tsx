import { useRef } from "react"
import { createPortal } from "react-dom"

import { useModal } from "../../hooks/useModal"

export const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { isOpen, closeModal, content } = useModal()
  const modalRoot = document.getElementById("modal")

  if (!isOpen || !modalRoot || !content) return null

  return createPortal(
    <div
      onClick={closeModal}
      className={`fixed inset-0 flex justify-center items-center z-99 bg-[#27282c]/50 `}
    >
      <div
        ref={modalRef}
        className={`bg-[#27282c] p-5 rounded-lg  relative transform transition-all ease-in-out border-2 border-[#5a5d63]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="rounded-full cursor-pointer font-semibold absolute top-2 left-2 text-2xl text-[#48d4c4] hover:bg-[#5a5d63] h-7 w-7 flex justify-center items-center pb-1"
          onClick={closeModal}
        >
          &times;
        </button>
        {content}
      </div>
    </div>,
    modalRoot
  )
}
