"use client";

import { useRouter } from "next/navigation";
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
import { SIGNIN_ROUTE } from "@/app/lib/definitions/routes";
// types
import { ALERT_SEVERITY } from "@/app/lib/definitions/ui";

export default function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const {
    auth: { isLoading },
    authActions: { toggleLoading },
    uiActions: {
      uiAlertsActions: { setMessage },
    },
  } = useStore();

  const handleFormSubmit = async (data: IUserRegisterRequest) => {
    toggleLoading(true);
    try {
      await registerUser(data);
      setMessage(t("userCreated"), ALERT_SEVERITY.SUCCESS);
      toggleLoading(false);
      router.push(SIGNIN_ROUTE);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toggleLoading(false);
    }
  };

  return (
    <>
      <BackdropStatus open={isLoading} status={t("registering")} />
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
