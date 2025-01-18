// components
import Logo from "@/app/ui/atoms/Logo";
import { Box } from "@mui/material";

export default function NavBar() {
  return (
    <Box
      className="p-5 rounded-2xl"
      sx={{
        "&:hover": {
          bgcolor: "primary.dark",
        },
        bgcolor: "primary.main",
      }}
    >
      <Logo single height={100} width={100} />
    </Box>
  );
}
