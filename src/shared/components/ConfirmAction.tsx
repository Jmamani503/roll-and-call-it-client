import { useModal } from "../hooks/useModal"
import { ActionButton } from "./ui/ActionButton"

interface Props {
  title: string,
  message: string,
  onConfirm: () => void
}

export const ConfirmAction = ({ message, title, onConfirm }: Props) => {

  const { closeModal } = useModal()

  return (
    <div className="w-xs mt-2 flex flex-col gap-6">
      <h3 className="text-[#26b0a1] text-2xl font-bold text-center">{title}</h3>
      <p className="text-[#f1f1f1] text-center block">{message}</p>
      <div className="flex gap-2">
        <ActionButton
          label="No"
          onClick={closeModal}
        ></ActionButton>
        <ActionButton
          label="Yes"
          onClick={onConfirm}
        ></ActionButton>
      </div>
    </div>
  )
}