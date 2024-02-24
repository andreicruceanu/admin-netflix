import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputCustom from "../../components/common/inputs/InputCustom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaCostum from "../../components/common/inputs/TextareaCostum";
import SelectCustom from "../../components/common/inputs/SelectCustom";
import apiCreateMovie from "../../api/modules/createMovie";
import { showToast } from "../../utils/functions";
import MultiSelectCustum from "../../components/common/inputs/MultiSelectCustom";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";

const FormCreateMovie = ({ handleNext }) => {
  const [movieStatus, setMovieStatus] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [onRequest, setOnRequest] = useState(false);

  const schemaCreateMovie = z.object({
    title: z.string().min(1, "Title is required").min(3),
    tagline: z.string().min(1, "Tagline is required").min(10),
    budget: z
      .string()
      .min(1, "Budget is required")
      .transform((value) => parseFloat(value)),
    revenue: z
      .string()
      .min(1, "Revenue is required")
      .transform((value) => parseFloat(value)),
    movie_status: z.string().min(1, "Please select movie status"),
    adult: z
      .string()
      .min(1, "Adult movie is required")
      .refine((value) => {
        return value === "true" || value === "false";
      })
      .transform((value) => {
        return value === "true";
      }),
    runtime: z
      .string()
      .min(1, "Runtime is required")
      .transform((value) => parseFloat(value)),
    release_date: z
      .string()
      .refine((date) => new Date(date).toString() !== "Invalid Date", {
        message: "A release date is required",
      })
      .transform((date) => new Date(date).toISOString().split("T")[0]),
    overview: z.string().min(1, "Overview is required").min(15),
    genre_ids: z.string().array().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      tagline: "",
      budget: "",
      revenue: "",
      movie_status: "",
      adult: "false",
      runtime: "",
      release_date: "",
      genre_ids: [],
      overview: "",
    },
    resolver: zodResolver(schemaCreateMovie),
  });

  useEffect(() => {
    const getMovieStatus = async () => {
      const { response, err } = await apiCreateMovie.getInfo();

      if (response) {
        setMovieStatus(response.statusMovie);
        setMovieGenres(response.genresMovie);
      }
      if (err) {
        showToast(err.message, "error");
      }
    };
    getMovieStatus();
  }, []);

  const onSubmit = async (data) => {
    setOnRequest(true);
    const { response, err } = await apiCreateMovie.createMoviePrimary(data);
    setOnRequest(false);

    if (response) {
      showToast("Saved succesffuly", "success");
      handleNext();
    }

    if (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Box component="form" minWidth="750px" onSubmit={handleSubmit(onSubmit)}>
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
          id="movie_status"
          label="Movie Status"
          required
          {...register("movie_status")}
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

export default FormCreateMovie;
