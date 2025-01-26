"use client";

// components
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Search from "@/app/ui/components/form/inputs/Search";
import Button, { ButtonScope, ButtonSizes } from "@/app/ui/components/Button";
import Form from "@/app/ui/components/form/Form";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function TopBar() {
  const { handleToggleMenu } = useStore();

  return (
    <>
      <AppBar className="rounded-lg" color="inherit" position="static">
        <Toolbar className="flex items-center justify-between p-5">
          <Box className="flex items-center none">
            <Button
              className="md:hidden"
              iconButtonProps={{
                color: "inherit",
                onClick: handleToggleMenu,
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
    </>
  );
}
