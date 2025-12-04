import { create } from "zustand";

interface ScoreCellStore {
  selectedCell: string | null;
  setSelectedCell: (id: string) => void;
  clearSelection: () => void;
}

export const useScoreCellStore = create<ScoreCellStore>((set) => ({
  selectedCell: null,
  setSelectedCell: (id) =>
    set((state) => ({
      selectedCell: state.selectedCell === id ? null : id,
    })),
  clearSelection: () => set({ selectedCell: null }),
}))