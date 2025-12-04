import { api } from "../../../shared/api/api"
import type { Game } from "../models/game.interface"

export const getGame = async (gameId: string): Promise<Game> => {
  console.log('get game triggered')
  return await api.get<Game>(`/game/${gameId}`)
}