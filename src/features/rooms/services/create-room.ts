import { api } from "../../../shared/api/api";
import type { Player } from "../../../shared/models/player.interface";
import type { Room } from "../models/room.interface";


export const createRoom = async (player: Player): Promise<Room> => {
  return await api.post('/room/create', player )
}