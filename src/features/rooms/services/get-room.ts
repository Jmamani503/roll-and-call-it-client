import { api } from "../../../shared/api/api"
import type { Room } from "../models/room.interface";

export const getRoom = async (roomId: string, id: string, name: string): Promise<Room> => {
  console.log('get room fetch triggered', id)
  const query = new URLSearchParams({ id, name }).toString();
  return await api.get(`/room/${roomId}?${query}`)
}