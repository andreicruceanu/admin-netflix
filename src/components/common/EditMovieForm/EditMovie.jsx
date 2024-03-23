import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import InputCustom from "../inputs/InputCustom";
import { useForm } from "react-hook-form";
import ButtonCostum from "../Buttons/ButtonCostum";
import { showToast } from "../../../utils/functions";
import SelectCustom from "../inputs/SelectCustom";
import MultiSelectCustum from "../inputs/MultiSelectCustom";
import TextareaCostum from "../inputs/TextareaCostum";
import { useMovieStatusAndGenres } from "../../../hooks/useMovieStatusAndGenres";
import FileInput from "../inputs/FileInput";
import apiEditMovie from "../../../api/modules/editMovie.api";

const EditMovie = ({ data, onClose, setAllMovies }) => {
  const [onRequest, setOnRequest] = useState(false);
  const { movieStatus, movieGenres } = useMovieStatusAndGenres();
  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: data?.title,
      tagline: data?.tagline,
      budget: data?.budget,
      revenue: data?.revenue,
      status: data?.status,
      adult: Boolean(data?.adult),
      runtime: data?.runtime,
      release_date: data?.release_date,
      genre_ids: data?.genre_ids,
      overview: data?.overview,
      poster: data?.poster_path,
      backdrop: data?.backdrop_path,
      siteMovie: "Youtube",
      typeVideo: "Official Trailer",
      key: data?.officialTrailer?.key,
    },
  });

  const onSubmit = async (editedMovie) => {
    setOnRequest(true);
    const { response, err } = await apiEditMovie.editMovie({
      movieId: data._id,
      ...editedMovie,
    });
    setOnRequest(false);
    if (response) {
      showToast("Succesfuly update movie", "success");
      setAllMovies((prev) =>
        prev.map((movie) =>
          movie._id.toString() === response._id.toString() ? response : movie
        )
      );
      onClose();
    }
    if (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack flexDirection="row" gap={5} mb={5}>
        <InputCustom
          id="title"
          type="text"
          placeholder="Enter title movie"
          label="Original Title"
          name="title"
          required
          register={register}
          errors={errors}
        />
        <InputCustom
          id="tagline"
          name="tagline"
          type="text"
          placeholder="Enter Tagline"
          label="Tagline"
          required
          register={register}
          errors={errors}
        />
      </Stack>
      <Stack flexDirection="row" gap={5} mb={5}>
        <InputCustom
          type="number"
          id="budget"
          required
          name="budget"
          placeholder="Enter budget"
          label="Budget (US Dollars)"
          register={register}
          errors={errors}
        />
        <InputCustom
          type="number"
          id="revenue"
          name="revenue"
          required
          placeholder="Enter revenue"
          label="Revenue"
          register={register}
          errors={errors}
        />
      </Stack>

      <Stack flexDirection="row" gap={5} mb={5}>
        <SelectCustom
          type="select"
          id="status"
          label="Movie Status"
          required
          {...register("status")}
          errors={errors}
        >
          {movieStatus &&
            movieStatus.map((el) => (
              <option key={el.id} value={el.value}>
                {el.name}
              </option>
            ))}
        </SelectCustom>
        <SelectCustom
          type="select"
          id="adult"
          label="Adult Movie?"
          required
          {...register("adult")}
          errors={errors}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </SelectCustom>
      </Stack>

      <Stack flexDirection="row" gap={5} mb={5}>
        <InputCustom
          id="runtime"
          name="runtime"
          type="text"
          placeholder="Enter runtime"
          label="Runtime"
          required
          register={register}
          errors={errors}
        />
        <InputCustom
          id="release_date"
          name="release_date"
          type="date"
          placeholder="Enter release date"
          label="Release Date"
          required
          register={register}
          errors={errors}
        />
      </Stack>

      <Stack flexDirection="column" gap={5} mb={5}>
        <MultiSelectCustum
          id="genre_ids"
          label="Select multiple genres"
          {...register("genre_ids")}
          option={movieGenres}
          setValue={setValue}
          errors={errors}
          defaultValue={data?.genre_ids}
        />

        <TextareaCostum
          id="overview"
          type="text"
          placeholder="Enter overview"
          label="Movie Overview"
          name="overview"
          required
          register={register}
          errors={errors}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        mb={3}
      >
        <FileInput
          register={register}
          name="poster"
          id="poster"
          errors={errors}
          setValue={setValue}
          label="Upload poster file here"
          defaultValue={data?.poster_path}
        />
        <FileInput
          register={register}
          name="backdrop"
          id="backdrop"
          errors={errors}
          setValue={setValue}
          label="Upload backdrop file here"
          defaultValue={data?.backdrop_path}
        />
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
          register={register}
          errors={errors}
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
    </Box>
  );
};

export default EditMovie;
