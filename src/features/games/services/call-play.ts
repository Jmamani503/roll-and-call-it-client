import { api } from "../../../shared/api/api"
import type { Game } from "../models/game.interface"

export const callPlay = async (gameId: string, selectedPlay: string, playerId: string): Promise<Game> => {
  return await api.post('/game/call-play', {gameId, selectedPlay, playerId})
}