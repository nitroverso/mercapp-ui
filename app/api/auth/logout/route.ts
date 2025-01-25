// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";

export async function POST() {
  try {
    const data = await commonFetch({
      external: true,
      options: { method: "POST" },
      url: "/auth/logout",
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("There was en error when calling the endpoint", error); // TODO: Implement global error handler with modal or status or similar from MUI
  }
}
