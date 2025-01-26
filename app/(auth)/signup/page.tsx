// components
import RegisterForm from "@/app/ui/components/form/RegisterForm";
import Actionable from "@/app/ui/components/Actionable";
import { Box, Typography } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("auth");

  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h4">{t("signUp")}</Typography>
      <Box className="flex flex-col items-center gap-4">
        <RegisterForm />
        <Actionable className="text-center" href="/signin">
          {t("haveAccount")}
        </Actionable>
      </Box>
    </Box>
  );
}
