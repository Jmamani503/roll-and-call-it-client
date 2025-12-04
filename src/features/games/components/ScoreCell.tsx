import type { Play } from "../models/player-score.interface"

interface Props {
  play: Play
  isSelected: boolean
  isEnabled: boolean
  onSelect: () => void
}

export const ScoreCell = ({ play, isSelected, isEnabled, onSelect }: Props) => {

  return (
    <button
      onClick={onSelect} 
      className={`w-16 h-12 md:w-20 md:h-16 flex flex-col justify-center items-center   ${isSelected ? 'bg-[#5a5d63]' : 'bg-[#27282c]'} ${isEnabled && play.value === 0 &&'cursor-pointer'}`} 
      disabled={!isEnabled || play.value > 0}
      >
      <small className={`block text-xs md:text-sm font-light text-white`}>{play.name}</small>
      <span className={` text-xl font-semibold ${play.value ? 'text-[#fff]' : 'text-white'}`}>{play.value}</span>
    </button>
  )
}