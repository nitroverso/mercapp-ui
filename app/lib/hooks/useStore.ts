import { create } from "zustand";
import { createNavBarSlice, NavBarSlice } from "@/app/lib/store/NavBarSlice";

type Store = NavBarSlice;

export const useStore = create<Store>()((...a) => ({
  ...createNavBarSlice(...a),
}));
