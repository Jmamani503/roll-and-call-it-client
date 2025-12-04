import { api } from "../../../shared/api/api";
import type { Game } from "../models/game.interface";

export const rollDice = async (roomId: string): Promise<Game> => {
  return await api.post('/game/roll', {roomId})
}