// components
import Grid from "@mui/material/Grid2";
import NavBar from "@/app/(dashboard)/components/NavBar";
import TopBar from "@/app/(dashboard)/components/TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      container
      className="bg-gray-300 h-screen p-7"
      // eslint-disable-next-line sort-keys
      columns={{ xs: 1, md: 5, lg: 7 }}
      component="main"
    >
      {/* Dashboard navbar container */}
      <Grid
        container
        className="h-full"
        component="section"
        // eslint-disable-next-line sort-keys
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
        size={{ md: 1 }}
      >
        <NavBar />
      </Grid>
      {/* Dashboard page main content */}
      <Grid
        component="section"
        // eslint-disable-next-line sort-keys
        size={{ xs: 1, md: 4, lg: 6 }}
      >
        <TopBar />
        {children}
      </Grid>
    </Grid>
  );
}
