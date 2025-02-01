// types
import { API_LOGOUT_ROUTE } from "@/app/lib/definitions/routes";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";
import { buildSourceString } from "@/app/lib/utils/errorHandler";

export async function POST() {
  try {
    const data = await commonFetch({
      external: true,
      options: { method: "POST" },
      source: buildSourceString({
        fileName: "logout",
        method: "POST",
      }),
      url: API_LOGOUT_ROUTE,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    throw error;
  }
}
