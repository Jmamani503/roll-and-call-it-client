import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import type { Room } from "../models"
import type { Player } from "@/shared/models/player.interface"
import { startGame } from "../services/game/start-game"

interface Data {
  roomId: string,
  players: Player[]
}

export const useStartGame = () => {

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ roomId, players }: Data) => startGame(roomId, players),
    onSuccess: (room) => {
      queryClient.setQueryData<Room>(['room', room.id], (oldRoom) => {
        if(!oldRoom) return oldRoom
        return {
          ...room
        }
      })
      navigate(`/rooms/${room.id}/game`)
    }
  })  
}
