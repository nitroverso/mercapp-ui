import { auth } from "@/auth";
// utils
import { handleErrorAPI } from "@/app/lib/utils/errorHandler";
// types
import { ERROR_TYPES } from "@/app/lib/definitions/errors";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface CommonFetchParams {
  external?: boolean; // ? Defines if the API call is external to our backend or to our internal routes (api folder)
  options?: FetchOptions; // ? Defines fetch options
  source: string; // ? Defines the place where the fetch is being used
  url: string; // ? Defines the uri to do the call
}

export type DefaultResponse<T> = {
  data: T;
  message: string;
};

export async function getRequestBody<TypeRequest>(req: Request) {
  const body: TypeRequest = await req.json();
  return JSON.stringify(body);
}

export const checkAuthentication = (req: Request) => {
  const authHeader = req.headers.get("Authorization");

  console.log("LOG: ", { authHeader });

  if (!authHeader) {
    console.error("ERROR:", { authHeader });
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
  external = false,
  options = {},
  source,
  url,
}: CommonFetchParams): Promise<T> => {
  try {
    //** ******* ******* OPTIONS OBJECT ******* ******* */
    const session = await auth();
    const authToken = session?.user.token;
    const defaultOptions: FetchOptions = {
      headers: {
        // ? This is only available until services calling API/ROUTES, not in API/ROUTES calling external (for them use checkAuthentication)
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
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

    //** ******* ******* FETCH EXECUTION ******* ******* */
    const apiUrl = `${
      external ? process.env.SERVER_API_BASE_URL : process.env.NEXT_API_BASE_URL
    }${url}`;
    const response = await fetch(apiUrl, fetchOptions);

    //** ******* ******* RESPONSE ERROR ******* ******* */
    // ? Process when response is not OK
    if (!response.ok) {
      // TODO: logout user if status = 401
      const errorData = await response.json();
      throw new Error(`${response.status}|${response.statusText}`, {
        cause: `${JSON.stringify(errorData)}`,
      });
    }

    //** ******* ******* RETURN RESPONSE ******* ******* */
    return response.body ? ((await response.json()) as T) : (response as T);
  } catch (error) {
    //** ******* ******* ERROR HANDLER ******* ******* */
    const errorType = external ? ERROR_TYPES.EXTERNAL : ERROR_TYPES.INTERNAL;
    throw handleErrorAPI({ error, errorType, source });
  }
};
