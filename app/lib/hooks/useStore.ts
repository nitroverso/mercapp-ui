import { create } from "zustand";
import { createNavBarSlice, NavBarSlice } from "@/app/lib/store/NavBarSlice";
import { AuthSlice, createAuthSlice } from "@/app/lib/store/AuthSlice";

type Store = NavBarSlice & AuthSlice;

export const useStore = create<Store>()((...a) => ({
  ...createNavBarSlice(...a),
  ...createAuthSlice(...a),
}));
