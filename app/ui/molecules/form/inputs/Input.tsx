import {
  Controller,
  Control,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
import { TextField } from "@mui/material";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  rules?: RegisterOptions;
  control?: Control;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  rules,
  control,
}) => (
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
        type={type}
      />
    )}
    rules={rules}
  />
);

export default Input;
