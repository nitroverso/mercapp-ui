// components
import LoginForm from "@/app/(auth)/components/LoginForm";
import Link from "@/app/ui/atoms/Link";
import { Box, Typography } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("auth");

  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h4">{t("signIn")}</Typography>
      <Box className="flex flex-col items-center gap-4">
        <LoginForm />
        <Link className="text-center" href="/signup">
          {t("notAccount")}
        </Link>
      </Box>
    </Box>
  );
}
