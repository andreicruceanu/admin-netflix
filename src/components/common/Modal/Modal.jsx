import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

const Modal = ({ size, isOpen, onClose, title, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={size}
      fullWidth
      sx={{ textAlign: "center" }}
      aria-labelledby="alert-dialog-title"
    >
      <IconButton
        sx={{ position: "absolute", right: "20px", top: "20px" }}
        onClick={() => onClose()}
      >
        <Close sx={{ fontSize: "26px", color: "black" }} />
      </IconButton>
      <DialogTitle id="alert-dialog-title" sx={{ padding: "30px 20px 20px" }}>
        <Typography variant="h5" fontWeight={600} mb={3} mt={3}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: "30px 60px" }}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
