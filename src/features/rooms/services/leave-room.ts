import { api } from "../../../shared/api/api"

export const leaveRoom = async (roomId: string, userId: string) => {
  return await api.post(`/room/leave/${roomId}`, {userId})
}