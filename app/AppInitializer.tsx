"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
// components
import LanguageSelector from "@/app/ui/components/LanguageSelector";
import SnackbarAlert from "@/app/ui/components/Alert";
import BackdropStatus from "@/app/ui/components/BackdropStatus";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useCategories } from "@/app/lib/hooks/useCategories";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const t = useTranslations("ui");
  const { data: session, status } = useSession();

  const { loadCategories, loadingCategories } = useCategories();
  const {
    auth: { session: storedSession },
    authActions: { setSession },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  const handleUserAuthentication = () => {
    if (status === "authenticated" && session?.user && !storedSession) {
      setSession(session.user);
    }
    if (status === "unauthenticated") setSession(null);
  };

  useEffect(() => {
    handleUserAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user, storedSession]);

  useEffect(() => {
    const loadInitialData = async () => {
      await loadCategories();
      setMessage(
        t("welcome", { name: storedSession!.profile.firstName }),
        ALERT_SEVERITY.SUCCESS
      );
    };

    if (storedSession) loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedSession]);

  return (
    <>
      <BackdropStatus open={loadingCategories} status={t("loadingApp")} />
      <LanguageSelector />
      <SnackbarAlert />
      {children}
    </>
  );
};

export default AppInitializer;
