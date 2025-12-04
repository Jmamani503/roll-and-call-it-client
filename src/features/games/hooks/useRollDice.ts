import { useMutation, useQueryClient } from "@tanstack/react-query"
import { rollDice } from "../services/roll-dice"
import { Phase, type Game } from "../models/game.interface"
import type { Room } from "../../rooms/models/room.interface"
import { useParams } from "react-router"

export const useRollDice = () => {

  const queryClient = useQueryClient()
  const { roomId } = useParams()

  return useMutation({
    mutationFn: (gameId: string) => rollDice(gameId),
    onSuccess: (game) => {
      console.log('dice rolled', game)
      queryClient.setQueryData<Room>(['room', roomId], (oldRoom) => {
        if(!oldRoom) return oldRoom
        return {
          ...oldRoom, 
          game
        }
      })
    }
  })
}