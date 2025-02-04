import { type NextRequest } from "next/server";
// types
import { API_LOGIN_ROUTE } from "@/app/lib/definitions/routes";
import {
  IAuthenticatedUser,
  IUserLoginRequest,
  IUserLoginResponse,
} from "@/app/lib/definitions/user";
// utils
import { commonFetch, getRequestBody } from "@/app/lib/utils/common-fetch";
import { buildSourceString } from "@/app/lib/utils/errorHandler";

export async function POST(req: NextRequest) {
  try {
    const body = await getRequestBody<IUserLoginRequest>(req);

    const data = await commonFetch<IUserLoginResponse>({
      external: true,
      options: { body, method: "POST" },
      source: buildSourceString({
        fileName: "login",
        method: "POST",
      }),
      url: API_LOGIN_ROUTE,
    });

    const response: IAuthenticatedUser = {
      email: data.session.email,
      emailVerified: new Date(data.session.email_confirmed_at),
      id: data.id,
      profile: { ...data.user },
      token: data.jwt,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    throw error;
  }
}
