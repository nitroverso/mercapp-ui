"use server";

// types
import {
  IProductRequest,
  IDeleteProductRequest,
  IProduct,
} from "@/app/lib/definitions/products";
import { API_PRODUCTS_ROUTE } from "@/app/lib/definitions/routes";
// utils
import {
  commonFetch,
  DefaultResponse,
  FETCH_METHODS,
} from "@/app/lib/utils/common-fetch";

const fileName = "serviceProducts";

export async function getAllProductsService(): Promise<IProduct[]> {
  const { data } = await commonFetch<DefaultResponse<IProduct[]>>({
    source: { fileName, method: "getAllProductsService" },
    url: API_PRODUCTS_ROUTE,
  });
  return data;
}

export async function addProductService(
  reqBody: IProductRequest
): Promise<IProduct> {
  const { data } = await commonFetch<DefaultResponse<IProduct>>({
    options: { method: FETCH_METHODS.POST, reqBody },
    source: { fileName, method: "addProductService" },
    url: API_PRODUCTS_ROUTE,
  });
  return data;
}

export async function updateProductService(
  reqBody: IProductRequest
): Promise<IProduct> {
  const { data } = await commonFetch<DefaultResponse<IProduct>>({
    options: { method: FETCH_METHODS.PUT, reqBody: { name: reqBody.name } },
    source: { fileName, method: "updateProductService" },
    url: `${API_PRODUCTS_ROUTE}/${reqBody.id}`,
  });
  return data;
}

export async function deleteProductService(
  reqBody: IDeleteProductRequest
): Promise<null> {
  await commonFetch<Response>({
    options: { method: FETCH_METHODS.DELETE },
    source: { fileName, method: "deleteProductService" },
    url: `${API_PRODUCTS_ROUTE}/${reqBody.productId}`,
  });
  return null;
}
