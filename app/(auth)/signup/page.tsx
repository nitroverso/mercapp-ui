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
      <Typography variant="h4">{t("signUp")}</Typography>
      <Box className="flex flex-col items-center gap-4">
        <TextField
          fullWidth
          id="name-input"
          label={t("name")}
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="lastName-input"
          label={t("lastName")}
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="username-input"
          label={t("username")}
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="email-input"
          label={t("email")}
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="password-input"
          label={t("password")}
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="confirmPassword-input"
          label={t("confirmPassword")}
          size="small"
          variant="outlined"
        />
        <Button size={ButtonSizes.LARGE}>{t("register")}</Button>
        <Link className="text-center" href="/signin">
          {t("haveAccount")}
        </Link>
      </Box>
    </Box>
  );
}
