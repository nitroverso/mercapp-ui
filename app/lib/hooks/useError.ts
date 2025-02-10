import { signOut } from "next-auth/react";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";
import { handleErrorUI } from "@/app/lib/utils/errorHandler";

const INVALID_TOKEN_TEXT = "Token inválido";

export function useError() {
  const {
    authActions: { toggleLoading },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  const processError = async (error: unknown) => {
    const cleansedError = handleErrorUI(
      error,
      "Error when loading categories."
    );
    if (cleansedError.includes(INVALID_TOKEN_TEXT)) {
      toggleLoading(true);
      await signOut();
      toggleLoading(false);
      setMessage("Session has expired. Please, sign in!", ALERT_SEVERITY.INFO);
    } else {
      setMessage(cleansedError, ALERT_SEVERITY.ERROR);
    }
  };

  return { processError };
}
