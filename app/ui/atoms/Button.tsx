// components
import { Button as MuiButton } from "@mui/material";

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

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonVariants;
}

export default function Button({ children, size, type, variant }: ButtonProps) {
  return (
    <MuiButton
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
}
