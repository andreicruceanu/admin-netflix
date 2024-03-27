import ChangePasswordForm from "./ChangePasswordForm";
import Modal from "../Modal/Modal";
import { Typography } from "@mui/material";
import { useState } from "react";

const ChangePassword = () => {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const handleModalClose = () => setShowFormEdit(false);

  return (
    <>
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: "14px",
          right: "20px",
          color: "#007aff",
          cursor: "pointer",
        }}
        onClick={() => setShowFormEdit(true)}
      >
        Change Password
      </Typography>

      <Modal
        size="xs"
        isOpen={showFormEdit}
        title="Change Password"
        onClose={handleModalClose}
      >
        <ChangePasswordForm onClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default ChangePassword;
