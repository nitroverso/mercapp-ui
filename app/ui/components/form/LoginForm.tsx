"use client";
import { signIn } from "next-auth/react";
// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/components/Button";
import { Box } from "@mui/material";
import Form from "@/app/ui/components/form/Form";
import Email from "@/app/ui/components/form/inputs/EmailInput";
import Password from "@/app/ui/components/form/inputs/PasswordInput";
// i18n
import { useTranslations } from "next-intl";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const t = useTranslations("auth");

  const onSubmit = (data: LoginFormData) => {
    signIn("credentials", data);
  };

  return (
    <>
      <Form<LoginFormData> onSubmit={onSubmit}>
        <Box className="flex flex-col items-center gap-4">
          <Email label={t("email")} name="email" />
          <Password label={t("password")} name="password" />
          <Button size={ButtonSizes.LARGE} type={ButtonTypes.SUBMIT}>
            {t("login")}
          </Button>
        </Box>
      </Form>
    </>
  );
}
