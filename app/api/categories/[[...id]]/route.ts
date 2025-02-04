import { type NextRequest } from "next/server";
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

export async function GET(req: NextRequest) {
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

export async function POST(req: NextRequest) {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> }
) {
  const authHeader = checkAuthentication(req);
  const categoryId = (await params).id?.[0];

  try {
    const response = await commonFetch<Response>({
      external: true,
      options: {
        headers: {
          Authorization: authHeader as string,
        },
        method: "DELETE",
      },
      source: buildSourceString({
        fileName: "categories",
        method: "DELETE",
      }),
      url: `${API_CATEGORIES_ROUTE}/${categoryId}`,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
