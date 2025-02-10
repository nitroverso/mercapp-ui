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
// services
import { getAllCategories } from "@/app/lib/services/serviceCategories";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";
import { handleErrorUI } from "@/app/lib/utils/errorHandler";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const t = useTranslations("ui");
  const { data: session, status } = useSession();
  const {
    auth: { session: storedSession },
    authActions: { setSession },
    categories: { loadingCategories },
    categoriesActions: { setCategories, setLoadingCategories },
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

  // Get app categories
  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const categories = await getAllCategories();
      setCategories(categories);
      setLoadingCategories(false);
      setMessage(
        t("welcome", { name: storedSession!.profile.firstName }),
        ALERT_SEVERITY.SUCCESS
      );
    } catch (error) {
      setLoadingCategories(false);
      const cleansedError = handleErrorUI(
        error,
        "Error when loading categories."
      );
      setMessage(cleansedError, ALERT_SEVERITY.ERROR);
    }
  };

  useEffect(() => {
    handleUserAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user, storedSession]);

  useEffect(() => {
    if (storedSession) {
      loadCategories();
    }
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
