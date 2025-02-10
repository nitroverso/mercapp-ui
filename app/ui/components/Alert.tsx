"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// components
import {
  Alert,
  AlertTitle,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";

const HIDE_DURATION_MAP = {
  [ALERT_SEVERITY.ERROR]: null,
  [ALERT_SEVERITY.INFO]: 5000,
  [ALERT_SEVERITY.SUCCESS]: 3000,
  [ALERT_SEVERITY.WARNING]: null,
};

const SnackbarAlert = () => {
  const t = useTranslations("ui");
  const {
    uiAlerts: { message, severity },
    uiActions: {
      uiAlertsActions: { clearMessage },
    },
  } = useStore();

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (message) setShowAlert(true);
  }, [message]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setShowAlert(false);
    setTimeout(() => clearMessage(), 1000);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={HIDE_DURATION_MAP[severity]}
      open={showAlert}
      onClose={handleClose}
    >
      {message ? (
        <Alert severity={severity} onClose={handleClose}>
          <AlertTitle>{t(severity)}</AlertTitle>
          {message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default SnackbarAlert;
