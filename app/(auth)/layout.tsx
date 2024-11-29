// components
import Grid from "@mui/material/Grid2";
import Logo from "@/app/ui/atoms/Logo";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // eslint-disable-next-line sort-keys
    <Grid container className="h-screen" columns={{ xs: 1, md: 5 }}>
      {/* Auth page container */}
      {/* eslint-disable-next-line sort-keys */}
      <Grid className="bg-white" size={{ xs: 1, md: 2 }}>
        <Grid container className="px-10" flexGrow={1} justifyContent="center">
          <Logo />
        </Grid>
        <Grid className="px-10" flexGrow={1}>
          {children}
        </Grid>
      </Grid>
      {/* Shopping cart placeholder */}
      <Grid
        className="relative bg-gradient-to-r from-orange-400 to-orange-500"
        size={{ md: 3 }}
      >
        <Image
          fill
          alt="Shopping cart of auth pages"
          className="object-cover"
          src="/shopping-cart.webp"
        />
      </Grid>
    </Grid>
  );
}
