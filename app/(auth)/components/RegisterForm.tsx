"use client";

// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/atoms/Button";
import Form from "@/app/ui/molecules/form/Form";
import Email from "@/app/ui/molecules/form/inputs/Email";
import Input, { InputSizes } from "@/app/ui/molecules/form/inputs/Input";
import Password from "@/app/ui/molecules/form/inputs/Password";
import { Box } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";

interface LoginFormData {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const t = useTranslations("auth");

  const handleFormSubmit = (data: LoginFormData) => {
    console.log("Form Data:", data); // TODO: Implement signUp
  };

  return (
    <>
      <Form<LoginFormData> onSubmit={handleFormSubmit}>
        <Box className="flex flex-col items-center gap-4 h-[350px] overflow-y-auto mb-4 pt-4">
          <Input
            isRequired
            label={t("name")}
            name="name"
            size={InputSizes.SMALL}
          />
          <Input
            isRequired
            label={t("lastName")}
            name="lasName"
            size={InputSizes.SMALL}
          />
          <Input
            isRequired
            label={t("username")}
            name="username"
            size={InputSizes.SMALL}
          />
          <Email label={t("email")} name="email" size={InputSizes.SMALL} />
          <Password
            label={t("password")}
            name="password"
            size={InputSizes.SMALL}
          />
          <Password
            label={t("confirmPassword")}
            name="confirmPassword"
            size={InputSizes.SMALL}
          />
        </Box>
        <Box className="text-center">
          <Button size={ButtonSizes.LARGE} type={ButtonTypes.SUBMIT}>
            {t("register")}
          </Button>
        </Box>
      </Form>
    </>
  );
}
