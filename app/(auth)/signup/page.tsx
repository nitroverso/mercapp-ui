// components
import Button, { ButtonSizes } from "@/app/ui/atoms/Button";
import Link from "@/app/ui/atoms/Link";
import { Box, TextField, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h4">Sign Up</Typography>
      <Box className="flex flex-col items-center gap-4">
        <TextField
          fullWidth
          id="name-input"
          label="Name"
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="lastName-input"
          label="Last name"
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="username-input"
          label="Username"
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="email-input"
          label="Email"
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="password-input"
          label="Password"
          size="small"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="confirmPassword-input"
          label="Confirm password"
          size="small"
          variant="outlined"
        />
        <Button size={ButtonSizes.LARGE}>Register</Button>
        <Link className="text-center" href="/signin">
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
}
