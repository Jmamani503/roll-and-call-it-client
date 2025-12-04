import { api } from "../../../../shared/api/api"
import type { Player } from "../../../../shared/models/player.interface"
import type { Room } from "../../models/room.interface"

export const startGame = async (roomId: string, players: Player[]): Promise<Room> => {
  return await api.post<Room>('/game/create', {roomId, players})
}