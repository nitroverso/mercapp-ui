// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
// services
import {
  addProductService,
  deleteProductService,
  getAllProductsService,
  updateProductService,
} from "@/app/lib/services/serviceProducts";

export function useProducts() {
  const {
    products: { list, loadingProducts },
    productsActions: { setProducts, setLoadingProducts },
  } = useStore();

  const { processError } = useError();

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const categories = await getAllProductsService();
      setProducts(categories);
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

  return {
    addProduct,
    products: list,
    deleteProduct,
    editProduct,
    loadProducts,
    loadingProducts,
  };
}
