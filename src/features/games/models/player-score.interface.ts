export interface PlayerScore {
  id: string,
  name: string,
  score: Play[],
  totalScore: number
}

export interface Play {
  name: string,
  value: number,
  bonus: number
}