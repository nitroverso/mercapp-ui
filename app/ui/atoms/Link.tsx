// components
import { Link as MuiLink } from "@mui/material";
// next
import NextLink from "next/link";

interface LinkProps {
  children: React.ReactNode;
  className: string;
  href: string;
}

export default function Link({ children, className, href }: LinkProps) {
  return (
    <MuiLink className={className} component={NextLink} href={href}>
      {children}
    </MuiLink>
  );
}
