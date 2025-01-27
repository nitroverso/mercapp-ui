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

const SnackbarAlert = () => {
  const t = useTranslations("ui");
  const {
    uiAlerts: { message },
    uiActions: {
      uiAlertsActions: { setMessage },
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
    setMessage("");
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={3000}
      open={showAlert}
      onClose={handleClose}
    >
      <Alert severity="success" onClose={handleClose}>
        <AlertTitle>{t("success")}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
