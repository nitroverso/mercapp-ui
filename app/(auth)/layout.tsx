import Image from "next/image";
// components
import Grid from "@mui/material/Grid2";
import Logo from "@/app/ui/atoms/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // eslint-disable-next-line sort-keys
    <Grid container className="h-screen" columns={{ xs: 1, md: 5, lg: 7 }}>
      {/* Auth page container */}
      {/* eslint-disable-next-line sort-keys */}
      <Grid size={{ xs: 1, md: 2 }}>
        <Grid container className="px-10" flexGrow={1} justifyContent="center">
          <Logo />
        </Grid>
        <Grid className="px-16" flexGrow={1}>
          {children}
        </Grid>
      </Grid>
      {/* Shopping cart placeholder */}
      <Grid
        className="relative bg-gradient-to-r from-orange-400 to-orange-500"
        // eslint-disable-next-line sort-keys
        size={{ md: 3, lg: 5 }}
      >
        <Image
          fill
          priority
          alt="Shopping cart of auth pages"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/shopping-cart.webp"
        />
      </Grid>
    </Grid>
  );
}
