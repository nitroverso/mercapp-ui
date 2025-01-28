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

  useEffect(() => {
    if (status === "authenticated" && session?.user && !storedSession) {
      setSession(session.user);
      setLoadingCategories(true);
      // Get app categories
      getAllCategories()
        .then((categories) => {
          setCategories(categories);
          setLoadingCategories(false);
          setMessage(t("welcome", { name: session.user.profile.firstName }));
        })
        .catch(() => {
          setLoadingCategories(false);
        });
    }
    if (status === "unauthenticated") setSession(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user, storedSession]);

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
