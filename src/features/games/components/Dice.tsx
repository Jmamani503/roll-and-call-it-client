import { Dice1 } from "../../../shared/components/icons/dice-1"
import { Dice0 } from "../../../shared/components/icons/Dice0"
import { Dice2 } from "../../../shared/components/icons/Dice2"
import { Dice3 } from "../../../shared/components/icons/Dice3"
import { Dice4 } from "../../../shared/components/icons/Dice4"
import { Dice5 } from "../../../shared/components/icons/Dice5"
import { Dice6 } from "../../../shared/components/icons/Dice6"
import type { Dice as DiceModel } from "../models/dice.interface"
import type { ReactNode } from "react"

interface Props {
  dice: DiceModel
  isSelected: boolean
  isSelectable: boolean
  onSelect: () => void
}

const diceIcons: Record<number, ReactNode> = {
  0: <Dice0 width={52} height={52} strokeWidth={1} stroke={'#fff'}/>,
  1: <Dice1 width={52} height={52} strokeWidth={1} stroke={'#fff'}/>,
  2: <Dice2 width={52} height={52} strokeWidth={1} stroke={'#fff'}/>,
  3: <Dice3 width={52} height={52} strokeWidth={1} stroke={'#fff'}/>,
  4: <Dice4 width={52} height={52} strokeWidth={1} stroke={'#fff'}/>,
  5: <Dice5 width={52} height={52} strokeWidth={1} stroke={'#fff'}/>,
  6: <Dice6 width={52} height={52} strokeWidth={1} stroke={'#fff'} />,
}

export const Dice = ({ dice, isSelected, onSelect, isSelectable }: Props) => {
 
  const icon = diceIcons[dice.value]

  return (
    <button 
      className={`${isSelected ? 'bg-[#5a5d63] -translate-y-2': ''} ${isSelectable && 'cursor-pointer'} rounded-md transition-all ease-in-out`}
      onClick={onSelect}
      disabled={!isSelectable}
      >
      {icon ?? dice.value}
    </button>
  )
}