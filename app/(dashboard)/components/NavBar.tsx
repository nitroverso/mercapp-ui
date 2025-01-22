"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
// components
import Logo from "@/app/ui/atoms/Logo";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "@/app/ui/atoms/Link";
// icons
import HomeIcon from "@mui/icons-material/Home";
import KitchenIcon from "@mui/icons-material/Kitchen";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// i18n
import { useTranslations } from "next-intl";
// routes
import {
  EVENTS_ROUTE,
  NOTIFICATIONS_ROUTE,
  CUPBOARD_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "@/app/lib/definitions/routes";

type MenuItem = {
  hideName?: boolean;
  icon: typeof HomeIcon;
  name: string;
  redirectTo: string;
};

// Sizes in px
const MENU_ITEM_ICON_SIZE = 50;
const MENU_ITEM_AVATAR_SIZE = MENU_ITEM_ICON_SIZE + 10;

export default function NavBar() {
  const t = useTranslations("navBar");
  const pathname = usePathname();

  const MENU_MAIN_ITEMS: MenuItem[] = [
    {
      icon: HomeIcon,
      name: t("home"),
      redirectTo: EVENTS_ROUTE,
    },
    {
      icon: KitchenIcon,
      name: t("cupboard"),
      redirectTo: CUPBOARD_ROUTE,
    },
    {
      icon: NotificationsIcon,
      name: t("notifications"),
      redirectTo: NOTIFICATIONS_ROUTE,
    },
  ];

  const MENU_BOTTOM_ITEMS: MenuItem[] = [
    {
      hideName: true,
      icon: PersonOutlineOutlinedIcon,
      name: t("profile"),
      redirectTo: PROFILE_ROUTE,
    },
    {
      hideName: true,
      icon: SettingsOutlinedIcon,
      name: t("settings"),
      redirectTo: SETTINGS_ROUTE,
    },
  ];

  const renderMenuItem = ({
    hideName,
    name,
    icon: Icon,
    redirectTo,
  }: MenuItem) => {
    return (
      <Fragment key={name}>
        <Link href={redirectTo}>
          <Avatar
            sx={{
              "&:hover": {
                bgcolor: "primary.dark",
                cursor: "pointer",
              },
              bgcolor:
                pathname === redirectTo ? "primary.dark" : "primary.main",
              height: MENU_ITEM_AVATAR_SIZE,
              width: MENU_ITEM_AVATAR_SIZE,
            }}
          >
            <Icon sx={{ fontSize: MENU_ITEM_ICON_SIZE }} />
          </Avatar>
        </Link>
        {!hideName && (
          <Typography
            className={clsx({ underline: pathname === redirectTo })}
            variant="overline"
          >
            {name}
          </Typography>
        )}
      </Fragment>
    );
  };

  return (
    <Box className="p-5 rounded-2xl flex flex-col justify-between bg-gradient-to-b from-orange-400 to-orange-500">
      <Logo single height={100} width={100} />
      <Box className="flex flex-col items-center gap-3">
        {MENU_MAIN_ITEMS.map(renderMenuItem)}
      </Box>
      <Box className="flex flex-col items-center gap-2">
        {MENU_BOTTOM_ITEMS.map(renderMenuItem)}
      </Box>
    </Box>
  );
}
