import { useMutation, useQueryClient } from "@tanstack/react-query"
import { leaveRoom } from "../services/leave-room"
import { useNavigate } from "react-router"
import { usePlayerStore } from "../../../shared/store/user-store"
import { useModal } from "../../../shared/hooks/useModal"

type Data = {
  roomId: string,
  userId: string
}

export const useLeaveRoom = () => {

  const navigate = useNavigate();
  const { setJoinedRoom, joinedRoom } = usePlayerStore()
  const queryClient = useQueryClient();
  const { closeModal } = useModal()

  return useMutation({
    mutationFn:({ roomId, userId }: Data) => leaveRoom(roomId, userId),
    onSuccess: () => {
      console.log('you leave the room :D')
      setJoinedRoom(null)
      queryClient.removeQueries({queryKey: ['room', joinedRoom], exact: true})
      closeModal()
      navigate('/', {replace: true})
    }
  })
}