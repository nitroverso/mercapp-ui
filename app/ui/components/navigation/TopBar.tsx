"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
// components
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Search from "@/app/ui/components/form/inputs/SearchInput";
import Button, { ButtonScope, ButtonSizes } from "@/app/ui/components/Button";
import Form from "@/app/ui/components/form/Form";
// hooks
import { useStore } from "@/app/lib/hooks/useStore";
import { useDebouncedCallback } from "use-debounce";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// i18n
import { useTranslations } from "next-intl";
// routes
import {
  CUPBOARD_ROUTE,
  CUPBOARD_ROUTE_ADD,
  CUPBOARD_ROUTE_EDIT,
  EVENTS_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "@/app/lib/definitions/routes";
// types
import { ITopBarSearch } from "@/app/lib/definitions/ui";

export default function TopBar() {
  const t = useTranslations("navBar");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const {
    uiActions: {
      uiNavbarActions: { toggleNavbar },
    },
  } = useStore();

  const ROUTE_MAPS_TO_MENU_ITEMS_TITLES = {
    [CUPBOARD_ROUTE]: t("cupboard"),
    [CUPBOARD_ROUTE_ADD]: t("cupboardAdd"),
    [CUPBOARD_ROUTE_EDIT]: t("cupboardEdit"),
    [EVENTS_ROUTE]: t("home"),
    [NOTIFICATIONS_ROUTE]: t("notifications"),
    [PROFILE_ROUTE]: t("profile"),
    [SETTINGS_ROUTE]: t("settings"),
  };
  const ADD_ACTION_REDIRECT_MAP = {
    [CUPBOARD_ROUTE]: CUPBOARD_ROUTE_ADD,
    [EVENTS_ROUTE]: EVENTS_ROUTE,
  };
  const ROUTE_WITH_NO_SEARCH = [
    CUPBOARD_ROUTE_ADD,
    CUPBOARD_ROUTE_EDIT,
    PROFILE_ROUTE,
    SETTINGS_ROUTE,
  ];
  const ROUTE_WITH_ADD = [CUPBOARD_ROUTE, EVENTS_ROUTE];
  const currentRoute = pathname as keyof typeof ROUTE_MAPS_TO_MENU_ITEMS_TITLES;
  const showSearch = !ROUTE_WITH_NO_SEARCH.includes(currentRoute);
  const showAddAction = ROUTE_WITH_ADD.includes(currentRoute);

  const handleSearch = useDebouncedCallback((data: ITopBarSearch) => {
    const params = new URLSearchParams(searchParams);
    const query = data.searchQuery;
    if (query) {
      params.set("searchQuery", query);
    } else {
      params.delete("searchQuery");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 0);

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
              sx={{
                display: {
                  xs: `${showSearch ? "none" : "block"}`,
                  // eslint-disable-next-line sort-keys
                  sm: "block",
                },
              }}
              variant="h6"
            >
              {ROUTE_MAPS_TO_MENU_ITEMS_TITLES[currentRoute]}
            </Typography>
          </Box>

          <Box className="w-fit flex items-center justify-between gap-1">
            {showSearch && (
              <Form<ITopBarSearch> preventReset onSubmit={handleSearch}>
                <Search />
              </Form>
            )}
            {showAddAction && (
              <Button
                iconButtonProps={{
                  color: "primary",
                  onClick: () =>
                    router.push(
                      ADD_ACTION_REDIRECT_MAP[
                        currentRoute as keyof typeof ADD_ACTION_REDIRECT_MAP
                      ]
                    ),
                  size: ButtonSizes.LARGE,
                }}
                scope={ButtonScope.ICON}
              >
                <AddCircleIcon />
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
