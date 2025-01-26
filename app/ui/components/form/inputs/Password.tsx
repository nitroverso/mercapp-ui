// components
import Input, { InputSizes } from "./Input";
// hooks
import { useFormContext } from "@/app/ui/components/form/Form";
// i18n
import { useTranslations } from "next-intl";

interface PasswordProps {
  label: string;
  name: string;
  size?: InputSizes;
}

const Password: React.FC<PasswordProps> = (props) => {
  const t = useTranslations("form");
  const { control } = useFormContext();

  return (
    <Input
      {...props}
      control={control}
      rules={{
        minLength: {
          message: t("passwordLength"),
          value: 6,
        },
        required: t("required"),
      }}
      type="password"
    />
  );
};

export default Password;
