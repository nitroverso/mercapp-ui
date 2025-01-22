"use client";

// components
import { AppBar, Badge, Box, Toolbar, Typography } from "@mui/material";
import Search from "@/app/ui/molecules/form/inputs/Search";
import Button, { ButtonScope, ButtonSizes } from "@/app/ui/atoms/Button";
import Form from "@/app/ui/molecules/form/Form";
// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";

export default function TopBar() {
  return (
    <AppBar className="rounded-lg" color="inherit" position="static">
      <Toolbar className="flex items-center justify-between">
        <Box className="flex items-center">
          <Button
            iconButtonProps={{
              color: "inherit",
              size: ButtonSizes.LARGE,
            }}
            scope={ButtonScope.ICON}
          >
            <MenuIcon />
          </Button>
          <Typography
            noWrap
            component="div"
            // eslint-disable-next-line sort-keys
            sx={{ display: { xs: "none", sm: "block" } }}
            variant="h6"
          >
            MUI
          </Typography>
        </Box>
        <Box className="w-fit">
          <Form onSubmit={() => ""}>
            <Search />
          </Form>
        </Box>
        <Button
          iconButtonProps={{ color: "primary", size: ButtonSizes.LARGE }}
          scope={ButtonScope.ICON}
        >
          <AddCircleIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}
