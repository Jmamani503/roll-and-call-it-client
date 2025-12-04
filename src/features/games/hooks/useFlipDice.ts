import { useMutation, useQueryClient } from "@tanstack/react-query"
import { flipDice } from "../services/flip-dice"
import { useParams } from "react-router"
import type { Room } from "../../rooms/models/room.interface"
import { useSelectedDiceStore } from "../store"

interface Data {
  gameId: string
  selectedDice: number[]
}

export const useFlipDice = () => {

  const queryClient = useQueryClient()
  const { setSelectedDice } = useSelectedDiceStore()
  const { roomId } = useParams()

  return useMutation({
    mutationFn: ({ gameId, selectedDice }: Data) => flipDice(gameId, selectedDice),
    onSuccess: (game) => {
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