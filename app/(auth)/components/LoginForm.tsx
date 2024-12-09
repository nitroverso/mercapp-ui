"use client";

// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/atoms/Button";
import Form from "@/app/ui/molecules/form/Form";
import Email from "@/app/ui/molecules/form/inputs/Email";
import Password from "@/app/ui/molecules/form/inputs/Password";
import { Box } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const t = useTranslations("auth");

  const handleFormSubmit = (data: LoginFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <Form<LoginFormData> onSubmit={handleFormSubmit}>
        <Box className="flex flex-col items-center gap-4">
          <Email name="email" label={t("email")} />
          <Password name="password" label={t("password")} />
          <Button size={ButtonSizes.LARGE} type={ButtonTypes.SUBMIT}>
            {t("login")}
          </Button>
        </Box>
      </Form>
    </>
  );
}
