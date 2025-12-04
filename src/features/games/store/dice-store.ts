import { create } from "zustand"
import { Phase } from "../models/game.interface"

interface SelectedDiceStore {
  selectedDice: number[]
  setSelectedDice: (dice: number[]) => void
  selectDice: (id: number, phase: Phase) => void
}

export const useSelectedDiceStore = create<SelectedDiceStore>((set) => ({
  selectedDice: [],
  setSelectedDice: (dice) => set({selectedDice: dice}),
  selectDice: (id, phase) =>
  set((state) => {
    if (state.selectedDice.includes(id)) {
      return {
        selectedDice: state.selectedDice.filter((diceId) => diceId !== id),
      };
    } else if (state.selectedDice.length < (phase === Phase.FLIP ? 2 : 5)) {
      return { selectedDice: [...state.selectedDice, id] };
    }
    return state; 
  }),
}))