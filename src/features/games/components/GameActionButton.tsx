interface Props {
  onClick: () => void
  isActive: boolean
  isCurrentPlayerTurn: boolean
  label: string
}

export const GameActionButton = ({ onClick, isActive, isCurrentPlayerTurn, label }: Props) => {

  return (
    <button
      onClick={onClick}
      className={`py-1 px-3 md:px-4 rounded-md text-white text-sm md:text-base font-bold border-2 border-[#5a5d63] transition-all ease-in-out 
              ${ isActive ? 'border-[#26b0a1]' : 'border-[#5a5d63]'} 
              ${ isCurrentPlayerTurn && 'hover:bg-[#26b0a1] cursor-pointer'}`}
      disabled={!isActive || !isCurrentPlayerTurn}
    >
      {label}
    </button>
  )
}