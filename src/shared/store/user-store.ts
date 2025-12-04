import { create } from "zustand";
import type { Player } from "../models/player.interface";

interface PlayerState {
  player: Player
  joinedRoom: string | null,
  setJoinedRoom: (roomId: string | null) => void
  setName: (name: string) => void
}

const getInitialUser = (): Player => {
  const stored = localStorage.getItem("user");
  if (stored) {
    return JSON.parse(stored);
  } 
  const user: Player = {
    id: crypto.randomUUID(),
    name: "",
  }
  localStorage.setItem("user", JSON.stringify(user))
  return user
};

export const usePlayerStore = create<PlayerState>((set) => ({
  player: getInitialUser(),
  joinedRoom: null,
  setJoinedRoom: (roomId) => set({joinedRoom: roomId}),
  setName: (name) =>
    set((state) => {
      const updated = { ...state.player, name };
      localStorage.setItem("user", JSON.stringify(updated));
      return { player: updated };
    })
}))