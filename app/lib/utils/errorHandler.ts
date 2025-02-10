import {
  IErrorHandlerAPIParams,
  IErrorParsed,
} from "@/app/lib/definitions/errors";

export const handleErrorAPI = ({
  error,
  source: { fileName, method },
}: IErrorHandlerAPIParams) => {
  const isTypeOfError = error instanceof Error;
  const errorCode = isTypeOfError ? Number(error.message.split("|")[0]) : 0;
  const parsedError: IErrorParsed = {
    cause: isTypeOfError ? error.cause : "Not identified",
    code: !isNaN(errorCode) ? errorCode : 0,
    message: isTypeOfError ? error.message : "Something unexpected happened",
    name: isTypeOfError ? error.name : "Unknown error",
    sourceDescription: `This error happens in ${fileName} / ${method}`,
  };
  return JSON.stringify(parsedError);
};

export const handleErrorUI = (
  error: unknown,
  extraDescription: string = ""
) => {
  const { code, message, name, sourceDescription, cause }: IErrorParsed =
    JSON.parse((error as Error).message);
  const cleansedError = `Snag error: We hit one ${name} with code ${code}. ${sourceDescription} and we have identified the cause as: ${cause} - ${message}.`;
  return `${extraDescription} ${cleansedError}`;
};
