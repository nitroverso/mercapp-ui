export enum ERROR_CODES {
  s0 = 0,
  s400 = 400,
  s401 = 401,
  s404 = 404,
  s500 = 500,
}

export enum ERROR_TYPES {
  EXTERNAL = "EXTERNAL ENDPOINT CALL",
  INTERNAL = "INTERNAL API CALL",
}

export const ERROR_SOURCE_DESCRIPTION_MAP = {
  [ERROR_TYPES.EXTERNAL]: "- API when calling EXTERNAL endpoint.",
  [ERROR_TYPES.INTERNAL]: "- Service when calling API.",
};

export type IBuildSourceStringParams = {
  fileName: string; // ? Defines the name of the service / API route
  method: string; // ? Defines the name of the function
};

export type IErrorHandlerAPIParams = {
  error: unknown;
  errorType: ERROR_TYPES;
  source: string; // ? Defines the name of the file/function when the error happens
};

export type IErrorParsed = {
  cause?: string | unknown;
  code: number;
  message: string;
  name: string;
  source: string;
  sourceDescription: string;
};
