// components
import Grid from "@mui/material/Grid2";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid container className="h-screen" columns={{ xs: 1, md: 5 }}>
      <Grid
        container
        alignItems="center"
        className="bg-white"
        direction="column"
        size={{ xs: 1, md: 2 }}
      >
        <Grid container alignItems="center" className="h-2/5" direction="row">
          <Image alt="Mercapp logo" height={500} src="/logo.png" width={500} />
        </Grid>
        <Grid className="h-3/5">{children}</Grid>
      </Grid>
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
