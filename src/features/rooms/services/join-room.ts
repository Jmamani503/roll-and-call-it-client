import { api } from "../../../shared/api/api"
import type { Player } from "../../../shared/models/player.interface"
import type { Room } from "../models/room.interface"

export const joinRoom = async (roomId: string, user: Player): Promise<Room> => {
  return api.post('/room/join', {roomId, user})
}