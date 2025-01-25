// types
import { IUserLoginRequest, IUser } from "@/app/lib/definitions/user";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";

export async function POST(req: Request) {
  try {
    const body: IUserLoginRequest = await req.json();

    const data = await commonFetch<IUser>({
      external: true,
      options: { body: JSON.stringify(body), method: "POST" },
      url: "/auth/login",
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("There was en error when calling the endpoint", error); // TODO: Implement global error handler with modal or status or similar from MUI
  }
}
