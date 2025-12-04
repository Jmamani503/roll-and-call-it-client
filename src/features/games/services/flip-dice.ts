import { api } from "../../../shared/api/api"
import type { Dice } from "../models/dice.interface"
import type { Game, Phase } from "../models/game.interface"

interface Data {
  gameId: string,
  dice: Dice[],
  phase: Phase
}
export const flipDice = async (gameId: string, selectedDice: number[]): Promise<Game> => {
  return await api.post<Game>('/game/flip', {gameId, selectedDice})
}