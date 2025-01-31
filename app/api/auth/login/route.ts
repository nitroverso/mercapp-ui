// types
import {
  IAuthenticatedUser,
  IUserLoginRequest,
  IUserLoginResponse,
} from "@/app/lib/definitions/user";
// utils
import { commonFetch, getRequestBody } from "@/app/lib/utils/common-fetch";

export async function POST(req: Request) {
  try {
    const body = await getRequestBody<IUserLoginRequest>(req);

    const data = await commonFetch<IUserLoginResponse>({
      external: true,
      options: { body, method: "POST" },
      url: "/auth/login",
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
    console.error("There was en error when calling the endpoint", error); // TODO: Implement global error handler with modal or status or similar from MUI
  }
}
