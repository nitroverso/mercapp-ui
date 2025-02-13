import { useTranslations } from "next-intl";
// components
import { Box, Typography } from "@mui/material";
// icons
import { MoodBad as MoodBadIcon } from "@mui/icons-material";

interface EmptyStateProps {
  message?: string;
  hideIcon?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hideIcon, message }) => {
  const t = useTranslations("ui");

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: 2,
        textAlign: "center",
      }}
    >
      {!hideIcon && (
        <MoodBadIcon sx={{ color: "text.secondary", fontSize: 64, mb: 2 }} />
      )}
      <Typography gutterBottom color="text.secondary" variant="h6">
        {message ?? t("empty")}
      </Typography>
    </Box>
  );
};

export default EmptyState;
