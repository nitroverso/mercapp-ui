// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
// services
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
} from "@/app/lib/services/serviceCategories";

export function useCategories() {
  const {
    categories: { list, loadingCategories },
    categoriesActions: { setCategories, setLoadingCategories },
  } = useStore();

  const { processError } = useError();

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const categories = await getAllCategories();
      setCategories(categories);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      processError(error);
    }
  };

  const addCategory = async (name: string) => {
    try {
      setLoadingCategories(true);
      const category = await addNewCategory({ name });
      setCategories([...list, ...[category]]);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      processError(error);
    }
  };

  const deleteTheCategory = async (categoryId: string) => {
    try {
      setLoadingCategories(true);
      await deleteCategory({ categoryId });
      const newList = [...list].filter(({ id }) => id !== categoryId);
      setCategories(newList);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      processError(error);
    }
  };

  return {
    addCategory,
    categories: list,
    deleteTheCategory,
    loadCategories,
    loadingCategories,
  };
}
