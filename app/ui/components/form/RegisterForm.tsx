"use client";

// components
import Button, { ButtonSizes, ButtonTypes } from "@/app/ui/components/Button";
import Form from "@/app/ui/components/form/Form";
import Email from "@/app/ui/components/form/inputs/EmailInput";
import TextInput from "@/app/ui/components/form/inputs/TextInput";
import Password from "@/app/ui/components/form/inputs/PasswordInput";
import { Box } from "@mui/material";
import BackdropStatus from "@/app/ui/components/BackdropStatus";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// i18n
import { useTranslations } from "next-intl";
import { InputSizes } from "@/app/ui/components/form/inputs/BaseInput";
// services
import { registerUser } from "@/app/lib/services/serviceAuth";
// types
import { IUserRegisterRequest } from "@/app/lib/definitions/user";

export default function RegisterForm() {
  const t = useTranslations("auth");
  const { authLoading, handleAuthLoading } = useStore();

  const handleFormSubmit = async (data: IUserRegisterRequest) => {
    handleAuthLoading(true);
    await registerUser(data);
    handleAuthLoading(false);
  };

  return (
    <>
      <BackdropStatus open={authLoading} status={t("signingIn")} />
      <Form<IUserRegisterRequest> onSubmit={handleFormSubmit}>
        <Box className="flex flex-col items-center gap-4 h-[350px] overflow-y-auto mb-4 pt-4">
          <TextInput
            isRequired
            label={t("name")}
            name="firstName"
            size={InputSizes.SMALL}
          />
          <TextInput
            isRequired
            label={t("lastName")}
            name="lastName"
            size={InputSizes.SMALL}
          />
          <TextInput // TODO: IMPLEMENT DATE PICKER
            isRequired
            label={t("birthdate")}
            name="birthday"
            size={InputSizes.SMALL}
          />
          <Email label={t("email")} name="email" size={InputSizes.SMALL} />
          <Password
            label={t("password")}
            name="password"
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
