import { usePlayerStore } from "../../../shared/store/user-store"
import type { PlayerScore } from "../models/player-score.interface"

interface Props {
  scores: PlayerScore[]
  currentTurnPlayerId: string
}

export const GameTableScore = ({ scores, currentTurnPlayerId }: Props) => {

  const { player: currentPlayer } = usePlayerStore()

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-1 w-full">
      {
        scores.map((player) => (
          <div
            key={player.id}
            className={`rounded-md px-3 py-1 flex justify-between text-[#fff] border-2 
            ${currentPlayer.id === player.id ? 'bg-[#5a5d63]' : ''} 
            ${player.id === currentTurnPlayerId ? 'border-[#26b0a1]' : 'border-[#5a5d63]'}
            `}
          >
            <span className="font-semibold text-sm md:text-base">{player.name}</span>
            <span className="text-sm font-bold  md:text-base">{player.totalScore}</span>
          </div>
        ))
      }
    </div>
  )
}
