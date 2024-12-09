import {
  Controller,
  Control,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
import { TextField } from "@mui/material";

export enum InputSizes {
  MEDIUM = "medium",
  SMALL = "small",
}

interface InputProps {
  control?: Control;
  label: string;
  name: string;
  rules?: RegisterOptions;
  size?: InputSizes;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  control,
  label,
  name,
  rules,
  size,
  type = "text",
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
        size={size ?? InputSizes.MEDIUM}
        type={type}
      />
    )}
    rules={rules}
  />
);

export default Input;
