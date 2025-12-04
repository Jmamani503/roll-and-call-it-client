import type { Game } from "../../games/models/game.interface";
import type { Player } from "../../../shared/models/player.interface";
import type { RoomStatus } from "./room-status.enum";

export interface Room {
  id: string,
  host: Player,
  name: string
  players: Player[],
  status: RoomStatus
  maxPlayers: number,
  isPrivate: boolean
  game: Game
}