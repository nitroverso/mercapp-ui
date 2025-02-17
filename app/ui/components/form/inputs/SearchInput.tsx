// components
import Button, { ButtonScope, ButtonTypes } from "@/app/ui/components/Button";
import { InputSizes } from "@/app/ui/components/form/inputs/BaseInput";
import { Divider, Paper } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";
// icons
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import TextInput from "@/app/ui/components/form/inputs/TextInput";

export default function Search() {
  const t = useTranslations("dashboard");

  return (
    <Paper
      // eslint-disable-next-line sort-keys
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
    >
      <TextInput // Change this by form
        isRequired
        label={t("search")}
        name="name"
        size={InputSizes.SMALL}
      />
      <Button
        iconButtonProps={{
          sx: { p: "10px" },
          type: ButtonTypes.BUTTON,
        }}
        scope={ButtonScope.ICON}
      >
        <SearchIcon />
      </Button>
      <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
      <Button
        iconButtonProps={{
          color: "primary",
          sx: { p: "10px" },
        }}
        scope={ButtonScope.ICON}
      >
        <TuneIcon />
      </Button>
    </Paper>
  );
}
