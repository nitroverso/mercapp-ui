// components
import Grid from "@mui/material/Grid2";
import NavBar from "@/app/ui/components/navigation/NavBar";
import TopBar from "@/app/ui/components/navigation/TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      container
      className="bg-gray-300 h-screen md:p-7"
      component="main"
      spacing={2}
    >
      {/* Dashboard navbar container */}
      <Grid
        container
        className="h-full"
        component="section"
        // eslint-disable-next-line sort-keys
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
        size="auto"
      >
        <NavBar />
      </Grid>
      {/* Dashboard page main content */}
      <Grid container component="section" flexDirection="column" size="grow">
        <TopBar />
        <Grid className="p-5" size="grow">
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
