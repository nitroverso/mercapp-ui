// components
import Button, { ButtonScope, ButtonTypes } from "@/app/ui/components/Button";
import { InputSizes } from "@/app/ui/components/form/inputs/BaseInput";
import { Paper } from "@mui/material";
// i18n
import { useTranslations } from "next-intl";
// icons
import SearchIcon from "@mui/icons-material/Search";
// import TuneIcon from "@mui/icons-material/Tune";
import TextInput from "@/app/ui/components/form/inputs/TextInput";

export default function Search() {
  const t = useTranslations("dashboard");

  return (
    <Paper
      // eslint-disable-next-line sort-keys
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
    >
      <TextInput
        label={t("search")}
        name="searchQuery"
        size={InputSizes.SMALL}
      />
      <Button
        iconButtonProps={{ sx: { p: "10px" } }}
        scope={ButtonScope.ICON}
        type={ButtonTypes.SUBMIT}
      >
        <SearchIcon />
      </Button>
      {/* <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
      <Button
        iconButtonProps={{
          color: "primary",
          sx: { p: "10px" },
        }}
        scope={ButtonScope.ICON}
      >
        <TuneIcon />
      </Button> */}
    </Paper>
  );
}
