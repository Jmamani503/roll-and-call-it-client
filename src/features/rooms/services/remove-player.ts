import { api } from "../../../shared/api/api"
import type { Room } from "../models/room.interface"

export const removePlayer = async (roomId: string, userId: string) => {
  console.log('from de removePlayer api')
  return await api.post<Room>(`/room/${roomId}/remove`, {userId})
}