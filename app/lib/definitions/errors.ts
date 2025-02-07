export enum ERROR_CODES {
  s0 = 0,
  s400 = 400,
  s401 = 401,
  s404 = 404,
  s500 = 500,
}

export type ISourceStringParams = {
  fileName: string; // ? Defines the name of the service / API route
  method: string; // ? Defines the name of the function
};

export type IErrorHandlerAPIParams = {
  error: unknown;
  source: ISourceStringParams; // ? Defines the name of the file/function when the error happens
};

export type IErrorParsed = {
  cause?: string | unknown;
  code: number;
  message: string;
  name: string;
  sourceDescription: string;
};
