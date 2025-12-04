import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRoom } from "../services/create-room"
import { useNavigate } from "react-router"
import { usePlayerStore } from "../../../shared/store/user-store"
import { useModal } from "../../../shared/hooks/useModal"
import { useToast } from "../../../shared/contexts/toast-context"

export const useCreateRoom = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { player } = usePlayerStore()
  const { closeModal } = useModal()
  const { addToast } = useToast()

  return useMutation({
    mutationKey: ['room'],
    mutationFn: () => createRoom(player),
    onSuccess: (room) => {
      console.log('mutation', room)
      queryClient.setQueryData(['room', room.id], room)
      navigate(`/rooms/${room.id}`)
      closeModal()
    },
    onError: (error) => {
      addToast(error.message)
    }
  })
}