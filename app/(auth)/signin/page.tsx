// components
import LoginForm from "@/app/(auth)/components/LoginForm";
import Actionable from "@/app/ui/atoms/Actionable";
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
        <Actionable className="text-center" href="/signup">
          {t("notAccount")}
        </Actionable>
      </Box>
    </Box>
  );
}
