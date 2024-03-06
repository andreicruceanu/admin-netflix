import React, { useContext, useState } from "react";
import { CreateMovieContext } from "../../context/createMovieContext/CreateMovieContext";
import { Box, Stack, Typography } from "@mui/material";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import apiCreateMovie from "../../api/modules/createMovie";
import { showToast } from "../../utils/functions";
import { deleteMovie } from "../../context/createMovieContext/CreateMovieAction";
import ConfirmDialog from "../../components/common/dialogConfirmation/DialogConfirmation";
import SelectCustom from "../../components/common/inputs/SelectCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputCustom from "../../components/common/inputs/InputCustom";
import { configsApp } from "../../configs/configsApp";

const FormVideo = () => {
  const { dispatch, movieData, movieStatus } = useContext(CreateMovieContext);

  console.log(movieData);

  const schemaAddVideo = z.object({
    key: z.string().min(1, "Source Key is required"),
    siteMovie: z.string(),
    typeVideo: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      siteMovie: "Youtube",
      typeVideo: "Official Trailer",
      key: "",
    },
    resolver: zodResolver(schemaAddVideo),
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const [onRequest, setOnRequest] = useState(false);

  const onDelete = async (mediaId) => {
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

  const onSubmit = async (data) => {
    data.mediaId = movieData.id;

    setOnRequest(true);
    const { response, err } = await apiCreateMovie.addVideoMovie(data);
    setOnRequest(false);
    if (response) {
      //   dispatch(createMoviePrimaryFacts(response));
      //   showToast("Saved succesffuly", "success");
    }
    // if (err) {
    //   showToast(err.message, "error");
    // }
  };

  return (
    <Box component="form" minWidth="750px" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, textAlign: "center", mb: 4 }}
      >
        Add a Video
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <img
          src={configsApp.imagesPoster(movieData?.poster_path)}
          alt={movieData.title}
          width="300px"
        />
      </Box>

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
      <Stack
        direction="row"
        alignItems="center"
        gap={5}
        mb={5}
        justifyContent="space-around"
      >
        <SelectCustom
          type="select"
          id="siteMovie"
          label="Site"
          name="siteMovie"
          required
          {...register("siteMovie")}
          errors={errors}
          disabled={true}
        >
          <option value="Youtube">YouTube</option>
        </SelectCustom>
        <SelectCustom
          type="select"
          id="typeMovie"
          label="Type Video"
          name="typeMovie"
          required
          {...register("typeVideo")}
          errors={errors}
          disabled={true}
        >
          <option value="Official Trailer">Official Trailer</option>
        </SelectCustom>
      </Stack>
      <Stack>
        <InputCustom
          id="key"
          name="key"
          type="text"
          placeholder="Source Key"
          label="Source Key"
          required
          register={register}
          errors={errors}
        />
      </Stack>
      <Stack mt={5} alignItems="center">
        <ButtonCostum
          type="submit"
          size="large"
          variant="contained"
          disabled={false}
          sx={{ width: "250px", padding: "15px 0px", borderRadius: "12px" }}
        >
          {false ? "Loading..." : "Save"}
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

export default FormVideo;
