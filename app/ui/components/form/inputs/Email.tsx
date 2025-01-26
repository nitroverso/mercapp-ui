// components
import Input, { InputSizes } from "./Input";
// hooks
import { useFormContext } from "@/app/ui/components/form/Form";
// i18n
import { useTranslations } from "next-intl";

interface EmailProps {
  label: string;
  name: string;
  size?: InputSizes;
}

const Email: React.FC<EmailProps> = (props) => {
  const t = useTranslations("form");
  const { control } = useFormContext();

  return (
    <Input
      {...props}
      control={control}
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
