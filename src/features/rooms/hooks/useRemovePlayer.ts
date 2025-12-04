import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removePlayer } from "../services/remove-player"
import type { Room } from "../models/room.interface"
import { useModal } from "../../../shared/hooks/useModal"

interface Data {
  roomId: string,
  userId: string
}

export const useRemovePlayer = () => {

  const queryClient = useQueryClient()
  const { closeModal } = useModal()

  return useMutation({
    mutationFn: ({roomId, userId}: Data) => removePlayer(roomId, userId),
    onSuccess: (room) => {
      queryClient.setQueryData<Room>(['room', room.id], (oldRoom) => {
        if(!oldRoom) return oldRoom;
        return {
          ...room
        }
      });
      closeModal()
    }
  })
}