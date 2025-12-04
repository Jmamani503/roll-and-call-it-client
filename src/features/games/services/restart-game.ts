import { api } from "../../../shared/api/api"
import type { Game } from "../models/game.interface"

export const RestartGame = async (gameId: string): Promise<Game> => {
  return await api.post<Game>('/game/restart', {gameId})
}