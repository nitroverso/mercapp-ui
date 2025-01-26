"use client";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
// components
import Logo from "@/app/ui/components/Logo";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Actionable from "@/app/ui/components/Actionable";
import Button, { ButtonScope } from "@/app/ui/components/Button";
// hooks
import { useResolutions } from "@/app/lib/hooks/useResolutions";
import { useStore } from "@/app/lib/hooks/useStore";
// icons
import HomeIcon from "@mui/icons-material/Home";
import KitchenIcon from "@mui/icons-material/Kitchen";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";
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

export type MenuItem = {
  hideName?: boolean;
  icon: typeof HomeIcon;
  name: string;
  redirectTo?: string;
  onClick?: () => void;
};

// Sizes in px
const MENU_ITEM_ICON_SIZE = 50;
const MENU_ITEM_AVATAR_SIZE = MENU_ITEM_ICON_SIZE + 10;

export default function NavBar() {
  const { openMenu, handleToggleMenu } = useStore();
  const t = useTranslations("navBar");
  const pathname = usePathname();
  const { isMobile } = useResolutions();

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
    {
      hideName: true,
      icon: LogoutIcon,
      name: t("logout"),
      onClick: () => signOut(),
    },
  ];

  const renderMobileMenuItem = ({
    name,
    icon: Icon,
    redirectTo,
    onClick,
  }: MenuItem) => {
    return (
      <ListItem
        key={name}
        className={clsx(
          pathname === redirectTo &&
            "bg-gradient-to-b from-orange-400 to-orange-500"
        )}
        sx={{ display: "block" }}
      >
        <Actionable href={redirectTo} onClick={onClick}>
          <ListItemButton>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText secondary={name} />
          </ListItemButton>
        </Actionable>
      </ListItem>
    );
  };

  const renderMobileMenu = () => {
    return (
      <Drawer open={openMenu} variant="temporary" onClose={handleToggleMenu}>
        <Button
          iconButtonProps={{ onClick: handleToggleMenu }}
          scope={ButtonScope.ICON}
        >
          <MenuOpenIcon sx={{ fontSize: 40 }} />
        </Button>
        <Divider />
        <List>
          {MENU_MAIN_ITEMS.map(renderMobileMenuItem)}
          <Divider className="" />
          {MENU_BOTTOM_ITEMS.map(renderMobileMenuItem)}
        </List>
      </Drawer>
    );
  };

  const renderDesktopMenuItem = ({
    hideName,
    name,
    icon: Icon,
    redirectTo,
    onClick,
  }: MenuItem) => {
    return (
      <Fragment key={name}>
        <Actionable href={redirectTo} onClick={onClick}>
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
        </Actionable>
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

  const renderDesktopMenu = () => {
    return (
      <Box className="p-4 rounded-lg flex flex-col items-center justify-between bg-gradient-to-b from-orange-400 to-orange-500">
        <Logo single height={100} width={100} />
        <Box className="flex flex-col items-center gap-3">
          {MENU_MAIN_ITEMS.map(renderDesktopMenuItem)}
        </Box>
        <Box className="flex flex-col items-center gap-2">
          {MENU_BOTTOM_ITEMS.map(renderDesktopMenuItem)}
        </Box>
      </Box>
    );
  };

  return isMobile ? renderMobileMenu() : renderDesktopMenu();
}
