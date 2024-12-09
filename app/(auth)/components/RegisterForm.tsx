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
    console.log("Form Data:", data);
  };

  return (
    <>
      <Form<LoginFormData> onSubmit={handleFormSubmit}>
        <Box className="flex flex-col items-center gap-4">
          <Input
            name="name"
            label={t("name")}
            rules={{ required: "Name is required" }}
            size={InputSizes.SMALL}
          />
          <Input
            name="lasName"
            label={t("lastName")}
            rules={{ required: "Last name is required" }}
            size={InputSizes.SMALL}
          />
          <Input
            name="username"
            label={t("username")}
            rules={{ required: "Username is required" }}
            size={InputSizes.SMALL}
          />
          <Email name="email" label={t("email")} size={InputSizes.SMALL} />
          <Password
            name="password"
            label={t("password")}
            size={InputSizes.SMALL}
          />
          <Password
            name="confirmPassword"
            label={t("confirmPassword")}
            size={InputSizes.SMALL}
          />
          <Button size={ButtonSizes.LARGE} type={ButtonTypes.SUBMIT}>
            {t("register")}
          </Button>
        </Box>
      </Form>
    </>
  );
}
