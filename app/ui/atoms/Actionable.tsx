// components
import Button from "@/app/ui/atoms/Button";
import { Link as MuiLink } from "@mui/material";
// next
import NextLink from "next/link";

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function Actionable({
  children,
  className,
  href,
  onClick,
}: LinkProps) {
  return href ? (
    <MuiLink className={className} component={NextLink} href={href}>
      {children}
    </MuiLink>
  ) : (
    <Button buttonProps={{ onClick }}>{children}</Button>
  );
}
