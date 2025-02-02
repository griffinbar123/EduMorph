import { create } from "zustand";

export const deckStore = create((set) => ({
    decks: [],
    addDecks: (decks) => set((state) => ({
        decks: decks
    }))
}))