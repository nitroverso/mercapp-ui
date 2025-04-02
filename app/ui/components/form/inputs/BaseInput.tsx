import dayjs, { Dayjs } from "dayjs";
import {
  Controller,
  Control,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
// components
import { MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// i18n
import { useTranslations } from "next-intl";
// types
import { DATE_FORMAT } from "@/app/lib/definitions/events";

export enum InputSizes {
  MEDIUM = "medium",
  SMALL = "small",
}

interface InputProps {
  control: Control;
  isDate?: boolean;
  isRequired?: boolean;
  label: string;
  name: string;
  options?: { label: string; value: string }[];
  rules?: RegisterOptions;
  size?: InputSizes;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  control,
  isDate,
  isRequired,
  label,
  name,
  options,
  rules = {},
  size,
  type = "text",
}) => {
  const t = useTranslations("form");

  const inputLabel = isRequired ? `${label} *` : label;
  const getInputError = (error: FieldError | undefined) =>
    (error as FieldError)?.message || "";

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field, fieldState: { error } }) =>
        isDate ? (
          <DatePicker
            format={DATE_FORMAT}
            label={inputLabel}
            minDate={dayjs()}
            slotProps={{
              textField: {
                error: !!error,
                helperText: getInputError(error),
              },
            }}
            sx={{ width: "100%" }}
            onChange={(newDate: Dayjs | null) => {
              field.onChange(newDate!.format(DATE_FORMAT));
            }}
          />
        ) : (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={getInputError(error)}
            label={inputLabel}
            select={!!options}
            size={size ?? InputSizes.MEDIUM}
            type={type}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )
      }
      rules={{
        required: isRequired ? t("required") : "",
        ...rules,
      }}
    />
  );
};

export default Input;
