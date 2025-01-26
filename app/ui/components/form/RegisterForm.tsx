"use client";

// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/components/Button";
import Form from "@/app/ui/components/form/Form";
import Email from "@/app/ui/components/form/inputs/EmailInput";
import TextInput from "@/app/ui/components/form/inputs/TextInput";
import Password from "@/app/ui/components/form/inputs/PasswordInput";
import { Box } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";
import { InputSizes } from "@/app/ui/components/form/inputs/BaseInput";

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
          <TextInput
            isRequired
            label={t("name")}
            name="name"
            size={InputSizes.SMALL}
          />
          <TextInput
            isRequired
            label={t("lastName")}
            name="lasName"
            size={InputSizes.SMALL}
          />
          <TextInput
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
