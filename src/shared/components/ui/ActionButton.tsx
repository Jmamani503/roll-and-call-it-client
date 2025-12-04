import type { ReactNode } from "react"
import { LoadingIcon } from "../icons/LoadingIcon"

interface Props {
  onClick: () => void
  label: string
  children?: ReactNode
  isLoading?: boolean
  isDisabled?: boolean 
}

export const ActionButton = ({ onClick, label, children, isDisabled = false, isLoading = false }: Props) => {

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md font-semibold  flex gap-2 justify-center items-center transition-all ease-in-out border-2 border-[#5a5d63] w-full ${!isDisabled ? 'hover:bg-[#5a5d63] cursor-pointer text-[#fff]' : 'text-[#5a5d63]'}`}
      disabled={isDisabled}
    >
      {
        isLoading 
          ? <LoadingIcon className="animate-spin"/> 
          : <>
            {children}
          <span className="text-sm md:text-base">{label}</span>
          </>
      }
      
    </button>
  )
}