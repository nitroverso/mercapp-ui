// types
import { ICategory } from "@/app/lib/definitions/categories";
// utils
import { commonFetch } from "@/app/lib/utils/common-fetch";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return Response.json(
      {
        error:
          "Missing Authorization header between Service and API/ROUTE GET Categories",
      },
      { status: 401 }
    );
  }

  try {
    const data = await commonFetch<ICategory[]>({
      external: true,
      options: {
        headers: {
          Authorization: authHeader,
        },
      },
      url: "/categories",
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("There was en error when calling the endpoint", error); // TODO: Implement global error handler with modal or status or similar from MUI
  }
}
