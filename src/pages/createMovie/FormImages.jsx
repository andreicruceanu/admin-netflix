import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FileInput from "../../components/common/inputs/FileInput";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMovieContext } from "../../context/createMovieContext/CreateMovieContext";
import ConfirmDialog from "../../components/common/dialogConfirmation/DialogConfirmation";
import apiCreateMovie from "../../api/modules/createMovie";
import { showToast } from "../../utils/functions";
import { deleteMovie } from "../../context/createMovieContext/CreateMovieAction";

const FormImages = () => {
  const MAX_FILE_SIZE = 5000000;
  function checkFileType(file) {
    if (file?.name) {
      const fileType = file.name.split(".").pop();
      if (fileType === "png" || fileType === "jpg" || fileType === "jpeg")
        return true;
    }
    return false;
  }

  const fileSchema = z.object({
    poster: z
      .any()
      .refine((file) => file?.length !== 0, "File is required")
      .refine((file) => file[0]?.size < MAX_FILE_SIZE, "Max size is 5MB.")
      .refine(
        (file) => checkFileType(file[0]),
        "Only .png, .jpg .jpeg formats are supported."
      ),
    backdrop: z
      .any()
      .refine((file) => file?.length !== 0, "File is required")
      .refine((file) => file[0]?.size < MAX_FILE_SIZE, "Max size is 5MB.")
      .refine(
        (file) => checkFileType(file[0]),
        "Only .png, .jpg .jpeg formats are supported."
      ),
  });

  const { dispatch, movieData, movieStatus } = useContext(CreateMovieContext);

  const [onRequest, setOnRequest] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const onDelete = async (mediaId) => {
    console.log(mediaId);
    const { response, err } = await apiCreateMovie.deleteMovie({ mediaId });
    if (response) {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      showToast("Delete movie succes", "success");
      dispatch(deleteMovie());
    }
    if (err) {
      showToast(err.message, "error");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(fileSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    setOnRequest(true);
    const { response, err } = await apiCreateMovie.uploadImages(data);
    setOnRequest(false);

    console.log(response, err);
  };

  return (
    <Box component="form" minWidth="750px" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, textAlign: "center", mb: 7 }}
      >
        Upload images for movie created
      </Typography>

      <Stack
        flexDirection="column"
        justifyContent="center"
        width="100%"
        gap={2}
        mb={4}
      >
        <Stack flexDirection="row" alignItems="center">
          <Typography flexBasis="18%">Movie Title: </Typography>
          <Box sx={{ background: "#f3f4f4", padding: 2, width: "100%" }}>
            <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>
              {movieData?.title}
            </Typography>
          </Box>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          <Typography flexBasis="18%">Movie Status: </Typography>
          <Box sx={{ background: "#f3f4f4", padding: 2, width: "100%" }}>
            <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>
              {movieStatus}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-around">
        <FileInput
          register={register}
          name="poster"
          id="poster"
          errors={errors}
          setValue={setValue}
          label="Upload poster file here"
        />
        <FileInput
          register={register}
          name="backdrop"
          id="backdrop"
          errors={errors}
          setValue={setValue}
          label="Upload backdrop file here"
        />
      </Stack>
      <Stack mt={5} alignItems="center">
        <ButtonCostum
          type="submit"
          size="large"
          variant="contained"
          loading={onRequest}
          disabled={onRequest}
          sx={{ width: "250px", padding: "15px 0px", borderRadius: "12px" }}
        >
          {onRequest ? "Loading..." : "Save"}
        </ButtonCostum>
      </Stack>
      <ButtonCostum
        onClick={() => {
          setConfirmDialog({
            isOpen: true,
            title: "Are you sure?",
            subtitle:
              "Do you really want to delete this movie? This process cannot be undone.",
            onConfirm: () => onDelete(movieData?._id),
          });
        }}
        sx={{
          position: "absolute",
          top: "30px",
          right: "30px",
          background: "rgb(255, 0, 0)",
          padding: 1.2,
          "&:hover": {
            background: "rgb(255, 0, 0)",
          },
        }}
      >
        Delete movie
      </ButtonCostum>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Box>
  );
};

export default FormImages;
