// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useError } from "@/app/lib/hooks/useError";
// services
import {
  addCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  updateCategoryService,
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
      const categories = await getAllCategoriesService();
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
      const category = await addCategoryService({ name });
      setCategories([...list, ...[category]]);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      processError(error);
    }
  };

  const editCategory = async (categoryId: string, name: string) => {
    try {
      setLoadingCategories(true);
      const category = await updateCategoryService({ categoryId, name });
      setCategories(
        list.map((item) => (item.id === categoryId ? category : item))
      );
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      processError(error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      setLoadingCategories(true);
      await deleteCategoryService({ categoryId });
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
    deleteCategory,
    editCategory,
    loadCategories,
    loadingCategories,
  };
}
