import { api } from "../../../shared/api/api"
import type { Room } from "../models/room.interface";

export const getRooms = async (): Promise<Room[]> => {
  return api.get('/room');
}