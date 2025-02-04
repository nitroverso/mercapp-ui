import { type NextRequest } from "next/server";
// types
import { API_REGISTER_ROUTE } from "@/app/lib/definitions/routes";
import { IUser, IUserRegisterRequest } from "@/app/lib/definitions/user";
// utils
import { commonFetch, getRequestBody } from "@/app/lib/utils/common-fetch";
import { buildSourceString } from "@/app/lib/utils/errorHandler";

export async function POST(req: NextRequest) {
  try {
    const body = await getRequestBody<IUserRegisterRequest>(req);

    const data = await commonFetch<IUser>({
      external: true,
      options: { body, method: "POST" },
      source: buildSourceString({
        fileName: "register",
        method: "POST",
      }),
      url: API_REGISTER_ROUTE,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    throw error;
  }
}
