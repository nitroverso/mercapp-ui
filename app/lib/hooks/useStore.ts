import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUISlice, UISlice } from "@/app/lib/store/UISlice";
import { AuthSlice, createAuthSlice } from "@/app/lib/store/AuthSlice";
import {
  CategoriesSlice,
  createCategoriesSlice,
} from "@/app/lib/store/CategoriesSlice";

type Store = UISlice & AuthSlice & CategoriesSlice;

export const useStore = create<Store>()(
  devtools((...a) => ({
    ...createUISlice(...a),
    ...createAuthSlice(...a),
    ...createCategoriesSlice(...a),
  }))
);
