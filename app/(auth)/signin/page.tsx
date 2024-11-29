import { Box, Button, TextField, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box className="flex flex-col gap-4" component="div">
      <Typography variant="h4">Sign In</Typography>
      <TextField fullWidth id="email-input" label="Email" variant="outlined" />
      <TextField
        fullWidth
        id="password-input"
        label="Password"
        variant="outlined"
      />
      <Button variant="contained">Login</Button>
    </Box>
  );
}
