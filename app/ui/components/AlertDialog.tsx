import { useTranslations } from "next-intl";
// components
import Button from "@/app/ui/components/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const AlertDialog = ({
  description,
  title,
  open,
  handleClose,
  handleConfirm,
}: AlertDialogProps) => {
  const t = useTranslations();

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button buttonProps={{ onClick: handleClose }}>
          {t("form.cancel")}
        </Button>
        <Button buttonProps={{ onClick: handleConfirm }}>{t("form.ok")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
