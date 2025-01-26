"use client";

// components
import SpeedDial, {
  ISpeedDialActions,
  SpeedDialDirections,
} from "@/app/ui/components/SpeedDial";
// definitions
import { SupportedLocales } from "@/app/lib/definitions/i18n";
// icons
import SvgIcon from "@mui/material/SvgIcon";
import TranslateIcon from "@mui/icons-material/Translate";
import { US as FlagUS, CO as FlagCO } from "country-flag-icons/react/3x2";
// services
import { setUserLocale } from "@/app/lib/services/serviceLocale";

export default function LanguageSelector() {
  const handleLocaleClick = (locale: SupportedLocales) => {
    setUserLocale(locale);
  };

  const localeActions: ISpeedDialActions[] = [
    {
      icon: (
        <SvgIcon onClick={() => handleLocaleClick(SupportedLocales.EN)}>
          <FlagUS title="United States" />
        </SvgIcon>
      ),
      name: SupportedLocales.EN,
    },
    {
      icon: (
        <SvgIcon onClick={() => handleLocaleClick(SupportedLocales.ES)}>
          <FlagCO title="Colombia" />
        </SvgIcon>
      ),
      name: SupportedLocales.ES,
    },
  ];

  return (
    <SpeedDial
      actions={localeActions}
      ariaLabel="language speed dial"
      className="absolute bottom-3 right-3"
      direction={SpeedDialDirections.LEFT}
      icon={<TranslateIcon />}
    />
  );
}
