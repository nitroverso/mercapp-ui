import {
  ERROR_SOURCE_DESCRIPTION_MAP,
  IBuildSourceStringParams,
  IErrorHandlerAPIParams,
  IErrorParsed,
} from "@/app/lib/definitions/errors";

export const buildSourceString = ({
  fileName,
  method,
}: IBuildSourceStringParams) => `${fileName} / ${method}`;

export const handleErrorAPI = ({
  error,
  errorType,
  source,
}: IErrorHandlerAPIParams) => {
  const isTypeOfError = error instanceof Error;
  const errorCode = isTypeOfError ? Number(error.message.split("|")[0]) : 0;
  const parsedError: IErrorParsed = {
    cause: isTypeOfError ? error.cause : "Not identified",
    code: !isNaN(errorCode) ? errorCode : 0,
    message: isTypeOfError ? error.message : "Something unexpected happened",
    name: isTypeOfError ? error.name : "Unknown error",
    source,
    sourceDescription: `This error happens in ${source} ${ERROR_SOURCE_DESCRIPTION_MAP[errorType]}`,
  };
  console.error("Captured in common-fetch: ", parsedError);
  return parsedError;
};
