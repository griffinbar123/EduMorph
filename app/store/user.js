import { create } from "zustand";

export const userStore = create((set) => ({
    user: {
        isLoggedIn: false
    },
    userLogIn: () => set((state) => ({
        user: {
            ...state.user,
            isLoggedIn: true
        }
    })),
    userLogOut: () => set((state) => ({
        user: {
            ...state.user,
            isLoggedIn: false
        }
    }))
}))