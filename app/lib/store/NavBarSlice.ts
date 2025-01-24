import { StateCreator } from "zustand";

export interface NavBarSlice {
  openMenu: boolean;
  handleToggleMenu: () => void;
}

export const createNavBarSlice: StateCreator<
  NavBarSlice,
  [],
  [],
  NavBarSlice
> = (set) => ({
  handleToggleMenu: () => set((state) => ({ openMenu: !state.openMenu })),
  openMenu: false,
});
