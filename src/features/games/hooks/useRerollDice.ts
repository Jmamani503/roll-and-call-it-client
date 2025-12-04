import { useMutation, useQueryClient } from "@tanstack/react-query"
import { rerollDice } from "../services/reroll-dice"
import type { Room } from "../../rooms/models/room.interface"
import { useParams } from "react-router"
import { useSelectedDiceStore } from "../store"

interface Data {
  gameId: string
  selectedDice: number[]
}

export const useRerollDice = () => {

  const queryClient = useQueryClient()
  const { setSelectedDice } = useSelectedDiceStore()
  const { roomId } = useParams()

  return useMutation({
    mutationFn: ({ gameId, selectedDice }: Data) => rerollDice(gameId, selectedDice),
    onSuccess: (game) => {
      console.log(game)
      queryClient.setQueryData<Room>(['room', roomId], (oldRoom) => {
        if (!oldRoom) return oldRoom
        return {
          ...oldRoom,
          game
        }
      })
      setSelectedDice([])
    }
  })
}