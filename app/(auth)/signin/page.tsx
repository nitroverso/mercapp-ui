// components
import Button, { ButtonSizes } from "@/app/ui/atoms/Button";
import Link from "@/app/ui/atoms/Link";
import { Box, TextField, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h4">Sign In</Typography>
      <Box className="flex flex-col items-center gap-4">
        <TextField
          fullWidth
          id="email-input"
          label="Email"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="password-input"
          label="Password"
          variant="outlined"
        />
        <Button size={ButtonSizes.LARGE}>Login</Button>
        <Link className="text-center" href="/signup">
          Do not have an account? Sign up
        </Link>
      </Box>
    </Box>
  );
}
