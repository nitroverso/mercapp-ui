interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface CommonFetchParams {
  url: string;
  options?: FetchOptions;
  external?: boolean;
}

export const commonFetch = async <T>({
  url,
  options = {},
  external = false,
}: CommonFetchParams): Promise<T> => {
  try {
    const apiUrl = `${
      external ? process.env.SERVER_API_BASE_URL : process.env.NEXT_API_BASE_URL
    }${url}`;

    const defaultOptions: FetchOptions = {
      headers: {
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
