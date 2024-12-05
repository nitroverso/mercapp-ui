// components
import { Button as MuiButton } from "@mui/material";

export enum ButtonSizes {
  LARGE = "large",
  MEDIUM = "medium",
}

export enum ButtonVariants {
  SOLID = "contained",
}

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSizes;
  variant?: ButtonVariants;
}

export default function Button({ children, size, variant }: ButtonProps) {
  return (
    <MuiButton
      size={size ?? ButtonSizes.MEDIUM}
      sx={{
        borderRadius: 5,
        px: 5,
        width: "fit-content",
      }}
      variant={variant ?? ButtonVariants.SOLID}
    >
      {children}
    </MuiButton>
  );
}
