"use client";
import { signIn } from "next-auth/react";
// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/components/Button";
import Form from "@/app/ui/components/form/Form";
import Email from "@/app/ui/components/form/inputs/Email";
import Password from "@/app/ui/components/form/inputs/Password";
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
      <Form<LoginFormData>
        className="flex flex-col items-center gap-4"
        onSubmit={onSubmit}
      >
        <Email label={t("email")} name="email" />
        <Password label={t("password")} name="password" />
        <Button size={ButtonSizes.LARGE} type={ButtonTypes.SUBMIT}>
          {t("login")}
        </Button>
      </Form>
    </>
  );
}
