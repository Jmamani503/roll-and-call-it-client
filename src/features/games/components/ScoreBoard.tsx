import type { PlayerScore } from "../models/player-score.interface"
import { useScoreCellStore } from "../store"
import { ScoreCell } from "./ScoreCell"

interface Props {
  player: PlayerScore
  isEnabled: boolean 
  round: number
}

export const ScoreBoard = ({ player, isEnabled, round }: Props) => {

  const { selectedCell, setSelectedCell } = useScoreCellStore()

  return (
    <>
      <h3 className="text-white text-xl font-bold">
        {player.name}'s turn <span className="text-[#26b0a1]">|</span> Round {round+1}
      </h3>
      <div className="grid grid-cols-3 gap-1 bg-[#5a5d63] p-1 rounded-sm">
        {
          player.score.map((score) => (
            <ScoreCell 
              key={score.name}
              play={score}
              isSelected={score.name === selectedCell}
              isEnabled={isEnabled}
              onSelect={() => setSelectedCell(score.name)}
            />
          ))
        }
      </div>
    </>
  )
}