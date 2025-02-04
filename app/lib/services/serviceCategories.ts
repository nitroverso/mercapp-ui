"use server";

// types
import {
  IAddCategoryRequest,
  ICategory,
  IDeleteCategoryRequest,
} from "@/app/lib/definitions/categories";
import { API_CATEGORIES_ROUTE } from "@/app/lib/definitions/routes";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";
import { buildSourceString } from "@/app/lib/utils/errorHandler";

export async function getAllCategories(): Promise<ICategory[]> {
  const categories = await commonFetch<ICategory[]>({
    source: buildSourceString({
      fileName: "serviceCategories",
      method: "getAllCategories",
    }),
    url: API_CATEGORIES_ROUTE,
  });
  return categories;
}

export async function addNewCategory(
  params: IAddCategoryRequest
): Promise<ICategory> {
  const body = JSON.stringify(params);
  const category = await commonFetch<ICategory>({
    options: { body, method: "POST" },
    source: buildSourceString({
      fileName: "serviceCategories",
      method: "addNewCategory",
    }),
    url: API_CATEGORIES_ROUTE,
  });
  return category;
}

export async function deleteCategory(
  params: IDeleteCategoryRequest
): Promise<null> {
  await commonFetch<ICategory>({
    options: { method: "DELETE" },
    source: buildSourceString({
      fileName: "serviceCategories",
      method: "deleteCategory",
    }),
    url: `${API_CATEGORIES_ROUTE}/${params.categoryId}`,
  });
  return null;
}
