import { create } from 'zustand'

type AppState = {
    dpi: number | null;
    setDpi: (dpi: number | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    dpi: null,
    setDpi: (dpi) => set({ dpi })
}))