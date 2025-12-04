import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callPlay } from "../services/call-play"
import type { Room } from "../../rooms/models/room.interface"
import { useParams } from "react-router"
import { useModal } from "@/shared/hooks/useModal"
import { GameNotification } from "../components"

interface CallProps {
  roomId: string,
  selectedPlay: string,
  playerId: string
}

export const useCallPlay = () => {

  const queryClient = useQueryClient()
  const { roomId } = useParams()
  const { openModal } = useModal()

  return useMutation({
    mutationFn: ({ roomId, selectedPlay, playerId }: CallProps) => callPlay(roomId, selectedPlay, playerId),
    onSuccess: (game) => {
      queryClient.setQueryData<Room>(['room', roomId], (oldRoom) => {
        if (!oldRoom) return oldRoom
        return {
          ...oldRoom,
          game
        }
      })
      if (game.hasFinished) {
        const message = game.winner.names.length === 1
          ? `${game.winner.names[0]} takes the victory with ${game.winner.score} points!`
          : `It's a tie between ${game.winner.names.join(", ")} — all with ${game.winner.score} points!`
        openModal(<GameNotification title="Game Over" message={message} />)
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })
}