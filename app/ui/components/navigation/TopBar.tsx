"use client";

import { usePathname } from "next/navigation";
// components
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Search from "@/app/ui/components/form/inputs/SearchInput";
import Button, { ButtonScope, ButtonSizes } from "@/app/ui/components/Button";
import Form from "@/app/ui/components/form/Form";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// i18n
import { useTranslations } from "next-intl";
// routes
import {
  CUPBOARD_ROUTE,
  EVENTS_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "@/app/lib/definitions/routes";

export default function TopBar() {
  const t = useTranslations("navBar");
  const pathname = usePathname();
  const {
    uiActions: {
      uiNavbarActions: { toggleNavbar },
    },
  } = useStore();

  const ROUTE_MAPS_TO_MENU_ITEMS_TITLES = {
    [EVENTS_ROUTE]: t("home"),
    [CUPBOARD_ROUTE]: t("cupboard"),
    [NOTIFICATIONS_ROUTE]: t("notifications"),
    [PROFILE_ROUTE]: t("profile"),
    [SETTINGS_ROUTE]: t("settings"),
  };

  return (
    <>
      <AppBar className="rounded-lg" color="inherit" position="static">
        <Toolbar className="flex items-center justify-between p-5">
          <Box className="flex items-center none">
            <Button
              className="md:hidden"
              iconButtonProps={{
                color: "inherit",
                onClick: toggleNavbar,
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
              {
                ROUTE_MAPS_TO_MENU_ITEMS_TITLES[
                  pathname as keyof typeof ROUTE_MAPS_TO_MENU_ITEMS_TITLES
                ]
              }
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
