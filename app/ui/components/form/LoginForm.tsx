"use client";
import { signIn } from "next-auth/react";
// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/components/Button";
import { Box } from "@mui/material";
import Form from "@/app/ui/components/form/Form";
import Email from "@/app/ui/components/form/inputs/EmailInput";
import Password from "@/app/ui/components/form/inputs/PasswordInput";
import BackdropStatus from "@/app/ui/components/BackdropStatus";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// i18n
import { useTranslations } from "next-intl";
// types
import { IUserLoginRequest } from "@/app/lib/definitions/user";

export default function LoginForm() {
  const t = useTranslations("auth");
  const {
    auth: { isLoading },
    authActions: { toggleLoading },
  } = useStore();

  const onSubmit = async (data: IUserLoginRequest) => {
    toggleLoading(true);
    await signIn("credentials", data);
    toggleLoading(false);
  };

  return (
    <>
      <BackdropStatus open={isLoading} status={t("signingIn")} />
      <Form<IUserLoginRequest> onSubmit={onSubmit}>
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
