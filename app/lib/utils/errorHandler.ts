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
  const errorName = isTypeOfError ? error.message.split("|")[1] : "";
  const parsedError: IErrorParsed = {
    cause: isTypeOfError ? error.cause : "Not identified",
    code: !isNaN(errorCode) ? errorCode : 0,
    name: isTypeOfError ? `${errorName || error.name}` : "Unknown error",
    sourceDescription: `This error happens in ${fileName} / ${method}`,
  };
  return JSON.stringify(parsedError);
};

export const handleErrorUI = (
  error: unknown,
  extraDescription: string = ""
) => {
  const { code, name, sourceDescription, cause }: IErrorParsed = JSON.parse(
    (error as Error).message
  );
  const cleansedError = `${name}: There is an ${code} code error. ${sourceDescription} and we have identified the cause as: ${cause}`;
  return `${extraDescription} ${cleansedError}`;
};
