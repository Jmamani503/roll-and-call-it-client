import { api } from "../../../shared/api/api"
import type { Game } from "../models/game.interface"

export const rerollDice = async (gameId: string, selectedDice: number[]): Promise<Game>=> {
  return await api.post('/game/reroll', {gameId, selectedDice})
}