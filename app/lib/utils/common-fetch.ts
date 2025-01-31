import { auth } from "@/auth";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface CommonFetchParams {
  url: string;
  options?: FetchOptions;
  external?: boolean;
}

export async function getRequestBody<TypeRequest>(req: Request) {
  const body: TypeRequest = await req.json();
  return JSON.stringify(body);
}

export const checkAuthentication = (req: Request) => {
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

  return authHeader;
};

export const commonFetch = async <T>({
  url,
  options = {},
  external = false,
}: CommonFetchParams): Promise<T> => {
  try {
    const session = await auth();

    const apiUrl = `${
      external ? process.env.SERVER_API_BASE_URL : process.env.NEXT_API_BASE_URL
    }${url}`;

    const authToken = session?.user.token;

    const defaultOptions: FetchOptions = {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}), // This is only available until services calling API/ROUTES, not in API/ROUTES calling external
        "Content-Type": "application/json",
      },
      method: "GET",
    };

    const fetchOptions: FetchOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} - ${response.statusText} | ${JSON.stringify(
          errorData
        )}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(
      "Fetch Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error; // TODO: Implement global error handler with modal or status or similar from MUI
  }
};
