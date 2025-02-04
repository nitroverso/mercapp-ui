// types
import {
  IAddCategoryRequest,
  ICategory,
} from "@/app/lib/definitions/categories";
import { API_CATEGORIES_ROUTE } from "@/app/lib/definitions/routes";
// utils
import {
  checkAuthentication,
  commonFetch,
  DefaultResponse,
  getRequestBody,
} from "@/app/lib/utils/common-fetch";
import { buildSourceString } from "@/app/lib/utils/errorHandler";

export async function GET(req: Request) {
  const authHeader = checkAuthentication(req);

  try {
    const response = await commonFetch<DefaultResponse<ICategory[]>>({
      external: true,
      options: {
        headers: {
          Authorization: authHeader as string,
        },
      },
      source: buildSourceString({
        fileName: "categories",
        method: "GET",
      }),
      url: API_CATEGORIES_ROUTE,
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    throw error;
  }
}

export async function POST(req: Request) {
  const authHeader = checkAuthentication(req);

  try {
    const body = await getRequestBody<IAddCategoryRequest>(req);

    const response = await commonFetch<DefaultResponse<ICategory>>({
      external: true,
      options: {
        body,
        headers: {
          Authorization: authHeader as string,
        },
        method: "POST",
      },
      source: buildSourceString({
        fileName: "categories",
        method: "POST",
      }),
      url: API_CATEGORIES_ROUTE,
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    throw error;
  }
}
