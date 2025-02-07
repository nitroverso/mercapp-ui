import { auth } from "@/auth";
// types
import { ISourceStringParams } from "@/app/lib/definitions/errors";
// utils
import { handleErrorAPI } from "@/app/lib/utils/errorHandler";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  reqBody?: object;
}

interface CommonFetchParams {
  options?: FetchOptions; // ? Defines fetch options
  source: ISourceStringParams; // ? Defines the place where the fetch is being used
  url: string; // ? Defines the uri to do the call
}

export enum FETCH_METHODS {
  DELETE = "DELETE",
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export type DefaultResponse<T> = {
  data: T;
  message: string;
};

export const commonFetch = async <T>({
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
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        "Content-Type": "application/json",
      },
      method: FETCH_METHODS.GET,
    };
    const fetchOptions: FetchOptions = {
      ...defaultOptions,
      ...options,
      ...([FETCH_METHODS.POST, FETCH_METHODS.PUT].includes(
        (options.method as FETCH_METHODS) ?? FETCH_METHODS.GET
      )
        ? { body: JSON.stringify(options.reqBody) }
        : {}),
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    //** ******* ******* FETCH EXECUTION ******* ******* */
    const apiUrl = `${process.env.SERVER_API_BASE_URL}${url}`;
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
    throw handleErrorAPI({ error, source });
  }
};
