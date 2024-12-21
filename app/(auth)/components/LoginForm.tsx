"use client";
import { signIn } from "next-auth/react";
// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/atoms/Button";
import Form from "@/app/ui/molecules/form/Form";
import Email from "@/app/ui/molecules/form/inputs/Email";
import Password from "@/app/ui/molecules/form/inputs/Password";
import { Box } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const t = useTranslations("auth");

  const handleFormSubmit = (data: LoginFormData) => {
    signIn("credentials", data);
  };

  return (
    <>
      <Form<LoginFormData> onSubmit={handleFormSubmit}>
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
