import { Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { showToast } from "../../utils/functions";
import { ReactComponent as Edit } from "../../assets/images/pencilWrite.svg";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";
import Modal from "../../components/common/Modal/Modal";
import apiCreateMovie from "../../api/modules/createMovie";
import EditMovie from "../../components/common/EditMovieForm/EditMovie";
import ConfirmDialog from "../../components/common/dialogConfirmation/DialogConfirmation";

const MoviesActions = ({ params, setAllMovies }) => {
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
    const { response, err } = await apiCreateMovie.deleteMovie({ mediaId });
    setOnRequest(false);
    if (response) {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setAllMovies((prev) => prev.filter((movie) => movie._id !== mediaId));
      showToast("Delete movie succes", "success");
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
          title="Edit movie"
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
          title="Delete this movie"
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
                  "Do you really want to delete this movie? This process cannot be undone.",
                onConfirm: () => onDeleteUser(params.row?._id),
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
        size="md"
        isOpen={showFormEdit}
        title="Edit Movie"
        onClose={handleModalClose}
      >
        <EditMovie
          data={params.row}
          onClose={handleModalClose}
          setAllMovies={setAllMovies}
        />
      </Modal>
    </>
  );
};

export default MoviesActions;
/* Bg */
/* Line */
