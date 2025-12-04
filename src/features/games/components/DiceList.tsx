import { Phase } from "@/features/games/models/game.interface"
import type { Dice as DiceModel } from "../models/dice.interface"
import { useSelectedDiceStore } from "../store"
import { Dice } from "./Dice"

interface Props {
  dice: DiceModel[]
  phase: Phase
  isCurrentPlayerTurn: boolean
}

export const DiceList = ({ dice, phase, isCurrentPlayerTurn }: Props) => {

  const { selectedDice, selectDice } = useSelectedDiceStore()
  
  const handleSelectDice = (id: number) => {
    selectDice(id, phase)
  }

  return (
    <div className="flex mt-2 md:gap-1">
      {
        dice.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            isSelected={selectedDice.includes(dice.id)}
            isSelectable={(phase === Phase.REROLL || phase === Phase.FLIP) && isCurrentPlayerTurn}
            onSelect={() => handleSelectDice(dice.id)}
          />
        ))
      }
    </div>
  )
}