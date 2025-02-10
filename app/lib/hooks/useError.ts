import { signOut } from "next-auth/react";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";
import { handleErrorUI } from "@/app/lib/utils/errorHandler";
import { SIGNIN_EXPIRED_ROUTE } from "@/app/lib/definitions/routes";

const INVALID_TOKEN_TEXT = "Token inválido";

export function useError() {
  const {
    authActions: { toggleLoading },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  const processError = async (error: unknown, origin?: string) => {
    const cleansedError = handleErrorUI(error, origin);
    if (cleansedError.includes(INVALID_TOKEN_TEXT)) {
      toggleLoading(true);
      await signOut({ redirectTo: SIGNIN_EXPIRED_ROUTE });
      toggleLoading(false);
    } else {
      setMessage(cleansedError, ALERT_SEVERITY.ERROR);
    }
  };

  return { processError };
}
