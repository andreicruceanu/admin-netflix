import { useState } from "react";
import { showToast } from "../../utils/functions";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";
import { ReactComponent as Edit } from "../../assets/images/pencilWrite.svg";
import ConfirmDialog from "../../components/common/dialogConfirmation/DialogConfirmation";
import adminApi from "../../api/modules/admin.api";
import Modal from "../../components/common/Modal/Modal";
import EditUser from "../../components/common/EditUserForm/EditUser";

const UsersAppActions = ({ params, setAllUsers }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const [showFormEdit, setShowFormEdit] = useState(false);

  const [onRequest, setOnRequest] = useState(false);

  const handleModalClose = () => setShowFormEdit(false);

  const onDeleteUser = async (mediaId) => {
    setOnRequest(true);
    const { response, err } = await adminApi.deleteUser(mediaId);
    setOnRequest(false);
    if (response) {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setAllUsers((prev) => prev.filter((user) => user.id !== response.id));
      showToast("Delete user succes", "success");
    }
    if (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          overflow: "hidden",
          border: "0.6px solid #D5D5D5",
          backgroundColor: "#FAFBFD",
          borderRadius: "9px",
        }}
      >
        <Tooltip
          title="Edit user"
          sx={{
            padding: "10px 16px",
            borderRight: " 0.4px solid #979797;",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: "9px",
            borderBottomLeftRadius: "9px",
          }}
        >
          <IconButton onClick={() => setShowFormEdit(true)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Delete this room"
          sx={{
            padding: "10px 16px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: "9px",
            borderBottomRightRadius: "9px",
          }}
        >
          <IconButton
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure?",
                subtitle:
                  "Do you really want to delete this user? This process cannot be undone.",
                onConfirm: () => onDeleteUser(params?.id),
              });
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        onRequest={onRequest}
      />
      <Modal
        size="sm"
        isOpen={showFormEdit}
        title="Edit User"
        onClose={handleModalClose}
      >
        <EditUser
          data={params.row}
          onClose={handleModalClose}
          setAllUsers={setAllUsers}
        />
      </Modal>
    </>
  );
};

export default UsersAppActions;
