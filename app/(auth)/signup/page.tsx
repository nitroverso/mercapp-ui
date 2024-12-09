// components
import RegisterForm from "@/app/(auth)/components/RegisterForm";
import Link from "@/app/ui/atoms/Link";
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
        <Link className="text-center" href="/signin">
          {t("haveAccount")}
        </Link>
      </Box>
    </Box>
  );
}
