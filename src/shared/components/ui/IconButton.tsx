import { type ReactNode } from "react"

interface Props {
  onClick: () => void
  title: string
  children: ReactNode
}

export const IconButton = ({ onClick, title, children }: Props) => {

  return (
    <button
      onClick={onClick}
      title={title}
      className="hover:bg-[#5a5d63] rounded-md cursor-pointer font-semibold flex justify-center items-center text-white transition-all ease-in-out py-2 w-full"
    >
      {children}
    </button>
  )
}