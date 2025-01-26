import { create } from "zustand";
import { createUISlice, UISlice } from "@/app/lib/store/UISlice";
import { AuthSlice, createAuthSlice } from "@/app/lib/store/AuthSlice";

type Store = UISlice & AuthSlice;

export const useStore = create<Store>()((...a) => ({
  ...createUISlice(...a),
  ...createAuthSlice(...a),
}));
