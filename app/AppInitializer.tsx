"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
// components
import LanguageSelector from "@/app/ui/components/LanguageSelector";
import SnackbarAlert from "@/app/ui/components/Alert";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { data: session, status } = useSession();
  const {
    authActions: { setSession },
  } = useStore();

  useEffect(() => {
    if (status === "authenticated" && session?.user) setSession(session.user);
    if (status === "unauthenticated") setSession(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user]);

  return (
    <>
      <LanguageSelector />
      <SnackbarAlert />
      {children}
    </>
  );
};

export default AppInitializer;
