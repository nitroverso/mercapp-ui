"use server";

// types
import {
  IAddCategoryRequest,
  ICategory,
  IDeleteCategoryRequest,
  IEditCategoryRequest,
} from "@/app/lib/definitions/categories";
import { API_CATEGORIES_ROUTE } from "@/app/lib/definitions/routes";
// utils
import {
  commonFetch,
  DefaultResponse,
  FETCH_METHODS,
} from "@/app/lib/utils/common-fetch";

const fileName = "serviceCategories";

export async function getAllCategoriesService(): Promise<ICategory[]> {
  const { data } = await commonFetch<DefaultResponse<ICategory[]>>({
    source: { fileName, method: "getAllCategoriesService" },
    url: API_CATEGORIES_ROUTE,
  });
  return data;
}

export async function addCategoryService(
  reqBody: IAddCategoryRequest
): Promise<ICategory> {
  const { data } = await commonFetch<DefaultResponse<ICategory>>({
    options: { method: FETCH_METHODS.POST, reqBody },
    source: { fileName, method: "addCategoryService" },
    url: API_CATEGORIES_ROUTE,
  });
  return data;
}

export async function updateCategoryService(
  reqBody: IEditCategoryRequest
): Promise<ICategory> {
  const { data } = await commonFetch<DefaultResponse<ICategory>>({
    options: { method: FETCH_METHODS.PUT, reqBody: { name: reqBody.name } },
    source: { fileName, method: "updateCategoryService" },
    url: `${API_CATEGORIES_ROUTE}/${reqBody.categoryId}`,
  });
  return data;
}

export async function deleteCategoryService(
  reqBody: IDeleteCategoryRequest
): Promise<null> {
  await commonFetch<Response>({
    options: { method: FETCH_METHODS.DELETE },
    source: { fileName, method: "deleteCategoryService" },
    url: `${API_CATEGORIES_ROUTE}/${reqBody.categoryId}`,
  });
  return null;
}
