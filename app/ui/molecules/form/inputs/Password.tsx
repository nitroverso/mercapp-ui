import { Control } from "react-hook-form";
import Input, { InputSizes } from "./Input";
// i18n
import { useTranslations } from "next-intl";

interface PasswordProps {
  control?: Control;
  label: string;
  name: string;
  size?: InputSizes;
}

const Password: React.FC<PasswordProps> = (props) => {
  const t = useTranslations("form");

  return (
    <Input
      {...props}
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
