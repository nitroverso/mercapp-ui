import {
  Controller,
  Control,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
import { TextField } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";

export enum InputSizes {
  MEDIUM = "medium",
  SMALL = "small",
}

interface InputProps {
  control?: Control;
  isRequired?: boolean;
  label: string;
  name: string;
  rules?: RegisterOptions;
  size?: InputSizes;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  control,
  isRequired,
  label,
  name,
  rules = {},
  size,
  type = "text",
}) => {
  const t = useTranslations("form");

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={(error as FieldError)?.message || ""}
          label={label}
          size={size ?? InputSizes.MEDIUM}
          type={type}
        />
      )}
      rules={{
        required: isRequired ? t("required") : "",
        ...rules,
      }}
    />
  );
};

export default Input;
