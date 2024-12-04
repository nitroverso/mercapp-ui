// components
import Link from "@/app/ui/atoms/Link";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box className="flex flex-col gap-4" component="div">
      <Typography variant="h4">Sign Up</Typography>
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
      <Button variant="contained">Login</Button>
      <Link className="text-center" href="/signin">
        Already have an account? Sign in
      </Link>
    </Box>
  );
}
