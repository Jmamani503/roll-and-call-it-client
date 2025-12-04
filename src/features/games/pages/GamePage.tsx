import { GamePageLoader } from "../../games/components/GamePageLoader"
import { useGetRoom } from "../../rooms/hooks/useGetRoom"
import { RoomNotFound } from "../../rooms/pages/RoomNotFound"
import { GameBoard, GameOptions, GameTableScore } from "../components"

export const GamePage = () => {

  const { data: room, isLoading,  } = useGetRoom()
  // const { openModal, closeModal } = useModal()
  // const [winnerModalShown, setWinnerModalShown] = useState(false);

  // useEffect(() => {
  //   if (room?.game.hasFinished && !winnerModalShown) {
  //     setWinnerModalShown(true);
  //     const message = room.game.winner.names.length === 1
  //   ? `${room.game.winner.names[0]} takes the victory with ${room.game.winner.score} points!`
  //   : `It's a tie between ${room.game.winner.names.join(", ")} — all with ${room.game.winner.score} points!`
  //     openModal(<GameNotification title="Game Over" message={message}/>)
  //   } else if (!room?.game.hasFinished && winnerModalShown) {
  //     setWinnerModalShown(false);
  //     closeModal()
  //   }
  // }, [closeModal, openModal, room?.game.hasFinished, room?.game.winner, winnerModalShown]);

  if(isLoading) {
    return <GamePageLoader />
  }

  if (room?.game.scores.length === 0 || !room) {
    return <RoomNotFound />
  }

  return (
    <div className="flex flex-col-reverse justify-center gap-2 md:gap-4 md:flex-row">
      <aside className="flex flex-col gap-2 w-full md:gap-4 md:flex-col md:w-48 bg-[#27282c] rounded-md h-fit p-2 md:p-4">
        <h3 
          className="text-white font-bold text-base md:text-xl text-center"
          >Scores 
        </h3>
        <div className="flex flex-col gap-1 w-full">
          <GameTableScore 
            scores={room.game.scores} 
            currentTurnPlayerId={room.game.scores[room.game.turn].id}
            />
          <GameOptions 
            gameId={room.game.id} hostId={room.game.scores[0].id}
          />
        </div>
      </aside>
      <GameBoard game={room.game}/>
    </div>
  )
}
