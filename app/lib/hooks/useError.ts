import { signOut } from "next-auth/react";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";
import { handleErrorUI } from "@/app/lib/utils/errorHandler";
import { SIGNIN_EXPIRED_ROUTE } from "@/app/lib/definitions/routes";

const INVALID_TOKEN_TEXT = "Token inválido";
const USER_NOT_FOUND = "Usuario no encontrado";
const CHECK_THE_REQUEST = "Please check the request";
const RESOURCE_NOT_FOUND = "Resource not found!";

export function useError() {
  const {
    authActions: { toggleLoading },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  const processError = async (error: unknown, origin?: string) => {
    const cleansedError = handleErrorUI(error, origin);
    if (
      [
        INVALID_TOKEN_TEXT,
        USER_NOT_FOUND,
        CHECK_THE_REQUEST,
        RESOURCE_NOT_FOUND,
      ].some((text) => cleansedError.includes(text))
    ) {
      toggleLoading(true);
      await signOut({ redirectTo: SIGNIN_EXPIRED_ROUTE });
      toggleLoading(false);
    } else {
      setMessage(cleansedError, ALERT_SEVERITY.ERROR);
    }
  };

  return { processError };
}
