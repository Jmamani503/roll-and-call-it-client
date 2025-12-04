import type { Dice } from "./dice.interface"
import type { PlayerScore } from "./player-score.interface"

export interface Game {
  id: string
  scores: PlayerScore[]
  dice: Dice[]
  round: number
  turn: number
  phase: Phase
  winner: {names: string[], score: number}
  hasFinished: boolean
}

export interface Player {
  id: string,
  score: Play[]
  tatalScore: number
}

export interface Play {
  name: string,
  value: string,
  bonus: string
}

export enum Phase {
  ROLL = "ROLL",
  REROLL = "REROLL",
  FLIP = "FLIP",
  CALL_IT = "CALL_IT"
}

