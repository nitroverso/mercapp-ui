"use server";

// types
import { ICategory } from "@/app/lib/definitions/categories";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";

export async function getAllCategories(): Promise<ICategory[]> {
  const categories = await commonFetch<ICategory[]>({ url: "/categories" });
  return categories;
}
