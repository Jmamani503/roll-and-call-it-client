import { Phase } from "../models/game.interface"
import { GameActionButton } from "./GameActionButton"
import { useCallPlay, useFlipDice, useRerollDice, useRollDice } from "../hooks"
import { usePlayerStore } from "@/shared/store/user-store"
import { useScoreCellStore, useSelectedDiceStore } from "../store"
import { useToast } from "@/shared/contexts/toast-context"

interface Props {
  gameId: string
  phase: Phase
  isCurrentPlayerTurn: boolean
  hasFinished: boolean
}

export const GameActions = ({ gameId, phase, isCurrentPlayerTurn, hasFinished }: Props) => {

  const { player } = usePlayerStore()
  const { mutate: roll } = useRollDice()
  const { mutate: reroll } = useRerollDice()
  const { mutate: flip } = useFlipDice()
  const { mutate: callPlay } = useCallPlay()
  const { selectedDice } = useSelectedDiceStore()
  const { selectedCell, clearSelection } = useScoreCellStore()
  const { addToast } = useToast()

  const handleRoll = () => {
    roll(gameId)
  }

  const handleReroll = () => {
    reroll({ gameId: gameId, selectedDice })
  }

  const onCallIt = () => {
    if (selectedCell) {
      callPlay({ roomId: gameId, selectedPlay: selectedCell, playerId: player.id })
      clearSelection()
    } else {
      addToast('Choose a play to call', 'error')
    }
  }

  const onFlipDice = () => {
    if (selectedDice.length > 0) {
      flip({ gameId: gameId, selectedDice })
    } else {
      addToast('Flip at least one dice', 'error')
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <GameActionButton
          onClick={handleRoll}
          isActive={phase === Phase.ROLL && !hasFinished}
          isCurrentPlayerTurn={phase === Phase.ROLL && isCurrentPlayerTurn && !hasFinished}
          label="Roll"
        />
        <GameActionButton
          onClick={handleReroll}
          isActive={phase === Phase.REROLL && !hasFinished}
          isCurrentPlayerTurn={phase === Phase.REROLL && isCurrentPlayerTurn && !hasFinished}
          label="Reroll"
        />
        <GameActionButton
          onClick={onFlipDice}
          isActive={phase === Phase.FLIP && !hasFinished}
          isCurrentPlayerTurn={phase === Phase.FLIP && isCurrentPlayerTurn && !hasFinished}
          label="Flip"
        />
        <GameActionButton
          onClick={onCallIt}
          isActive={phase === Phase.CALL_IT && !hasFinished}
          isCurrentPlayerTurn={phase === Phase.CALL_IT && isCurrentPlayerTurn && !hasFinished}
          label="Call It"
        />
      </div>
    </div>
  )
}