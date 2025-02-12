import { StateCreator } from "zustand";
// types
import { IProduct } from "@/app/lib/definitions/products";

/** *******  Products Slice contexts interface definition ******* */
interface ProductsContext {
  loadingProducts: boolean;
  list: IProduct[];
}
/** ******* ******* ******* ******* ******* ******* ******* */

/** *******  Products Slice actions interface definition ******* */
interface ProductsActions {
  setProducts: (products: IProduct[]) => void;
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
  products: { list: [], loadingProducts: false },
  productsActions: {
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
