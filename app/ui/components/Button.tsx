// components
import {
  Box,
  ButtonProps as MuiButtonProps,
  IconButton,
  IconButtonProps,
  Button as MuiButton,
} from "@mui/material";

export enum ButtonSizes {
  LARGE = "large",
  MEDIUM = "medium",
}

export enum ButtonTypes {
  BUTTON = "button",
  RESET = "reset",
  SUBMIT = "submit",
}

export enum ButtonVariants {
  SOLID = "contained",
}

export enum ButtonScope {
  DEFAULT = "default",
  ICON = "icon",
}

interface ButtonProps {
  buttonProps?: MuiButtonProps;
  children: React.ReactNode;
  className?: string;
  iconButtonProps?: IconButtonProps;
  scope?: ButtonScope;
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonVariants;
}

export default function Button({
  buttonProps,
  children,
  className,
  iconButtonProps,
  scope = ButtonScope.DEFAULT,
  size,
  type,
  variant,
}: ButtonProps) {
  const renderIconButton = () => {
    return (
      <IconButton {...iconButtonProps} type={type ?? ButtonTypes.BUTTON}>
        {children}
      </IconButton>
    );
  };

  const renderDefaultButton = () => {
    return (
      <MuiButton
        {...buttonProps}
        size={size ?? ButtonSizes.MEDIUM}
        sx={{
          borderRadius: 5,
          px: 5,
          width: "fit-content",
        }}
        type={type ?? ButtonTypes.BUTTON}
        variant={variant ?? ButtonVariants.SOLID}
      >
        {children}
      </MuiButton>
    );
  };

  return (
    <Box className={className}>
      {scope === ButtonScope.DEFAULT
        ? renderDefaultButton()
        : renderIconButton()}
    </Box>
  );
}
