import { StateCreator } from "zustand";
// types
import { ICategory } from "@/app/lib/definitions/categories";

/** *******  Categories Slice contexts interface definition ******* */
interface CategoriesContext {
  loadingCategories: boolean;
  list: ICategory[];
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  Categories Slice actions interface definition ******* */
interface CategoriesActions {
  setCategories: (categories: ICategory[]) => void;
  setLoadingCategories: (isLoading: boolean) => void;
}
/** ******* ******* ******* ******* ******* ******* ******* */

export interface CategoriesSlice {
  categories: CategoriesContext;
  categoriesActions: CategoriesActions;
}

export const createCategoriesSlice: StateCreator<
  CategoriesSlice,
  [],
  [],
  CategoriesSlice
> = (set) => ({
  categories: { list: [], loadingCategories: false },
  categoriesActions: {
    setCategories: (categoriesList) =>
      set((state) => ({
        categories: { ...state.categories, list: categoriesList },
      })),
    setLoadingCategories: (isLoading) =>
      set((state) => ({
        categories: { ...state.categories, loadingCategories: isLoading },
      })),
  },
});
