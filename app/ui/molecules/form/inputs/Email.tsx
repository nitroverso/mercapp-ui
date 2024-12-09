import { Control } from "react-hook-form";
import Input, { InputSizes } from "./Input";
// i18n
import { useTranslations } from "next-intl";

interface EmailProps {
  control?: Control;
  label: string;
  name: string;
  size?: InputSizes;
}

const Email: React.FC<EmailProps> = (props) => {
  const t = useTranslations("form");

  return (
    <Input
      {...props}
      rules={{
        pattern: {
          message: t("emailValid"),
          value: /^\S+@\S+$/,
        },
        required: t("required"),
      }}
      type="email"
    />
  );
};

export default Email;
