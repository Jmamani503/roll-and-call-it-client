import { api } from "../../../shared/api/api"
import type { Game } from "../models/game.interface"

export const flipDice = async (gameId: string, selectedDice: number[]): Promise<Game> => {
  return await api.post<Game>('/game/flip', {gameId, selectedDice})
}