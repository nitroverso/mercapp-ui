// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
import { useCategories } from "@/app/lib/hooks/useCategories";
import { useUnits } from "@/app/lib/hooks/useUnits";
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
  const { units } = useUnits();
  const {
    products: { groupedList: groupedProducts, list: products, loadingProducts },
    productsActions: { setProducts, setLoadingProducts, setGroupedProducts },
  } = useStore();

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
      setProducts([...products, ...[product]]);
      setLoadingProducts(false);
    } catch (error) {
      setLoadingProducts(false);
      processError(error);
    }
  };

  const editProduct = async (productId: string, name: string) => {
    try {
      setLoadingProducts(true);
      const product = await updateProductService({ name, productId });
      setProducts(
        products.map((item) => (item.id === productId ? product : item))
      );
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
      const newList = [...products].filter(({ id }) => id !== productId);
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
        category.products.push({
          ...product,
          unit: units.find((unit) => unit.id === product.unit_id)!,
        });
      }
    });

    setGroupedProducts(Object.values(categoriesMap));
  };

  return {
    addProduct,
    deleteProduct,
    editProduct,
    getGroupedProducts,
    groupedProducts,
    loadProducts,
    loadingProducts,
    products,
  };
}
