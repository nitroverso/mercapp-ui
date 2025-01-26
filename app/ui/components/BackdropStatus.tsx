// components
import { Backdrop, Typography } from "@mui/material";
// icons
import CircularProgress from "@mui/material/CircularProgress";

interface BackdropStatusProps {
  status: string;
  open: boolean;
}

const BackdropStatus = ({ status, open }: BackdropStatusProps) => {
  return (
    <Backdrop
      open={open}
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress className="mr-3" color="inherit" />
      <Typography variant="h5">{status}</Typography>
    </Backdrop>
  );
};

export default BackdropStatus;
