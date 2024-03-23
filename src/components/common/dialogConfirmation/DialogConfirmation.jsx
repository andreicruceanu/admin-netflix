import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";
const ConfirmDialog = ({ confirmDialog, setConfirmDialog, onRequest }) => {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={confirmDialog?.isOpen}
      sx={{ textAlign: "center" }}
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton disableRipple sx={{ padding: 2 }}>
          <HighlightOffIcon sx={{ fontSize: "80px", color: "#c34444" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" mb={2}>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 600,
              color: "black",
              opacity: 0.7,
              mb: 2,
            }}
          >
            {confirmDialog.title}
          </Typography>
          <Typography>{confirmDialog.subtitle}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ minWidth: "150px" }}
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ minWidth: "150px" }}
          onClick={confirmDialog?.onConfirm}
        >
          {onRequest && onRequest !== "undefined " ? "Loading..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
