/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
// components
import LanguageSelector from "@/app/ui/components/LanguageSelector";
import SnackbarAlert from "@/app/ui/components/Alert";
import BackdropStatus from "@/app/ui/components/BackdropStatus";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useCategories } from "@/app/lib/hooks/useCategories";
import { useUnits } from "@/app/lib/hooks/useUnits";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const t = useTranslations("ui");
  const { data: session, status } = useSession();
  const sessionParam = useSearchParams().get("session");
  const {
    auth: { session: storedSession },
    authActions: { setSession },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();
  const { loadCategories, loadingCategories } = useCategories();
  const { loadUnits, loadingUnits } = useUnits();

  const handleUserAuthentication = () => {
    if (status === "authenticated" && session?.user && !storedSession) {
      setSession(session.user);
      setMessage(
        t("welcome", { name: session.user.profile.firstName }),
        ALERT_SEVERITY.SUCCESS
      );
    }
    if (status === "unauthenticated") setSession(null);
  };

  useEffect(() => {
    if (sessionParam && sessionParam === "expired") {
      setMessage("Session has expired. Please, sign in!", ALERT_SEVERITY.INFO);
    }
  }, [sessionParam]);

  useEffect(() => {
    handleUserAuthentication();
  }, [status, session?.user, storedSession]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await loadCategories();
        await loadUnits();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    };

    if (storedSession) loadInitialData();
  }, [storedSession]);

  const showLoader = loadingCategories || loadingUnits;

  return (
    <>
      <BackdropStatus open={showLoader} status={t("loadingApp")} />
      <LanguageSelector />
      <SnackbarAlert />
      {children}
    </>
  );
};

export default AppInitializer;
