import { StateCreator } from "zustand";

export interface AuthSlice {
  authLoading: boolean;
  handleAuthLoading: (isLoading: boolean) => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  authLoading: false,
  handleAuthLoading: (isLoading) => set(() => ({ authLoading: isLoading })),
});
