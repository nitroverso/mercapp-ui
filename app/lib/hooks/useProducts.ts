import { useState } from "react";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
import { useCategories } from "@/app/lib/hooks/useCategories";
// services
import {
  addProductService,
  deleteProductService,
  getAllProductsService,
  updateProductService,
} from "@/app/lib/services/serviceProducts";
// types
import { IGroupedProducts } from "@/app/lib/definitions/products";

export function useProducts() {
  const { categories } = useCategories();
  const {
    products: { list: products, loadingProducts },
    productsActions: { setProducts, setLoadingProducts },
  } = useStore();
  const [groupedProducts, setGroupedProducts] = useState<IGroupedProducts[]>(
    []
  );

  const { processError } = useError();

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const products = await getAllProductsService();
      setProducts(products);
      setLoadingProducts(false);
    } catch (error) {
      setLoadingProducts(false);
      processError(error);
    }
  };

  const addProduct = async (name: string) => {
    try {
      setLoadingProducts(true);
      const product = await addProductService({ name });
      setProducts([...list, ...[product]]);
      setLoadingProducts(false);
    } catch (error) {
      setLoadingProducts(false);
      processError(error);
    }
  };

  const editProduct = async (productId: string, name: string) => {
    try {
      setLoadingProducts(true);
      const product = await updateProductService({ productId, name });
      setProducts(list.map((item) => (item.id === productId ? product : item)));
      setLoadingProducts(false);
    } catch (error) {
      setLoadingProducts(false);
      processError(error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setLoadingProducts(true);
      await deleteProductService({ productId });
      const newList = [...list].filter(({ id }) => id !== productId);
      setProducts(newList);
      setLoadingProducts(false);
    } catch (error) {
      setLoadingProducts(false);
      processError(error);
    }
  };

  const getGroupedProducts = () => {
    const categoriesMap: { [key: string]: IGroupedProducts } = {};

    categories.forEach((category) => {
      categoriesMap[category.id] = { ...category, products: [] };
    });

    products.forEach((product) => {
      const category = categoriesMap[product.category_id];
      if (category) {
        category.products.push(product);
      }
    });

    setGroupedProducts(Object.values(categoriesMap));
  };

  return {
    addProduct,
    products,
    deleteProduct,
    editProduct,
    loadProducts,
    loadingProducts,
    groupedProducts,
    getGroupedProducts,
  };
}
