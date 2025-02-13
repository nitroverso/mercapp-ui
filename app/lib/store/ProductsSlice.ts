import { StateCreator } from "zustand";
// types
import { IGroupedProducts, IProduct } from "@/app/lib/definitions/products";

/** *******  Products Slice contexts interface definition ******* */
interface ProductsContext {
  loadingProducts: boolean;
  list: IProduct[];
  groupedList: IGroupedProducts[];
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  Products Slice actions interface definition ******* */
interface ProductsActions {
  setProducts: (products: IProduct[]) => void;
  setGroupedProducts: (groupedProducts: IGroupedProducts[]) => void;
  setLoadingProducts: (isLoading: boolean) => void;
}
/** ******* ******* ******* ******* ******* ******* ******* */

export interface ProductsSlice {
  products: ProductsContext;
  productsActions: ProductsActions;
}

export const createProductsSlice: StateCreator<
  ProductsSlice,
  [],
  [],
  ProductsSlice
> = (set) => ({
  products: { groupedList: [], list: [], loadingProducts: false },
  productsActions: {
    setGroupedProducts: (groupedProducts) =>
      set((state) => ({
        products: { ...state.products, groupedList: groupedProducts },
      })),
    setProducts: (productsList) =>
      set((state) => ({
        products: { ...state.products, list: productsList },
      })),
    setLoadingProducts: (isLoading) =>
      set((state) => ({
        products: { ...state.products, loadingProducts: isLoading },
      })),
  },
});
