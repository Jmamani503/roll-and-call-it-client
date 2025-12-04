import { Phase, type Game } from "../models/game.interface"
import { usePlayerStore } from "@/shared/store/user-store"
import { ScoreBoard } from "./ScoreBoard"
import { DiceList } from "./DiceList"
import { GameActions } from "./GameActions"

interface Props {
  game: Game
}

export const GameBoard = ({ game }: Props) => {

  const { player } = usePlayerStore()
  const isCurrentPlayerTurn = (game && game.scores[game.turn]?.id === player.id) ?? false;
  
  return (
    <section className="flex flex-col justify-center items-center p-2 md:p-4  rounded-md  bg-[#27282c] gap-2 md:gap-4">
      <ScoreBoard
        player={game.scores[game.turn]}
        isEnabled={game.phase === Phase.CALL_IT && isCurrentPlayerTurn}
        round={game.round}
      />
      <DiceList
        dice={game.dice}
        phase={game.phase}
        isCurrentPlayerTurn={isCurrentPlayerTurn}
      />
      <GameActions
        gameId={game.id}
        isCurrentPlayerTurn={isCurrentPlayerTurn}
        phase={game.phase}
        hasFinished={game.hasFinished}
      ></GameActions>
    </section>
  )
}
