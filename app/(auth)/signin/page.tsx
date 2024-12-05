// components
import Button, { ButtonSizes } from "@/app/ui/atoms/Button";
import Link from "@/app/ui/atoms/Link";
import { Box, TextField, Typography } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("auth");

  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h4">{t("signIn")}</Typography>
      <Box className="flex flex-col items-center gap-4">
        <TextField
          fullWidth
          id="email-input"
          label={t("email")}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="password-input"
          label={t("password")}
          variant="outlined"
        />
        <Button size={ButtonSizes.LARGE}>{t("login")}</Button>
        <Link className="text-center" href="/signup">
          {t("notAccount")}
        </Link>
      </Box>
    </Box>
  );
}
