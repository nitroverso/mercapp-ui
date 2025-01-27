"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
// components
import LanguageSelector from "@/app/ui/components/LanguageSelector";
import SnackbarAlert from "@/app/ui/components/Alert";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const t = useTranslations("ui");
  const { data: session, status } = useSession();
  const {
    auth: { session: storedSession },
    authActions: { setSession },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  useEffect(() => {
    if (status === "authenticated" && session?.user && !storedSession) {
      setSession(session.user);
      setMessage(t("welcome", { name: session.user.profile.firstName }));
    }
    if (status === "unauthenticated") setSession(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user, storedSession]);

  return (
    <>
      <LanguageSelector />
      <SnackbarAlert />
      {children}
    </>
  );
};

export default AppInitializer;
