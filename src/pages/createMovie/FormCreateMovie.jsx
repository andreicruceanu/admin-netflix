import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "../../utils/functions";
import { CreateMovieContext } from "../../context/createMovieContext/CreateMovieContext";
import { createMoviePrimaryFacts } from "../../context/createMovieContext/CreateMovieAction";
import { useMovieStatusAndGenres } from "../../hooks/useMovieStatusAndGenres";
import { schemaCreateMoviePrimaryFacts } from "../../utils/schemaValidation/SchemaCreateMoviePrimaryFacts";
import InputCustom from "../../components/common/inputs/InputCustom";
import TextareaCostum from "../../components/common/inputs/TextareaCostum";
import SelectCustom from "../../components/common/inputs/SelectCustom";
import apiCreateMovie from "../../api/modules/createMovie";
import MultiSelectCustum from "../../components/common/inputs/MultiSelectCustom";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";

const FormCreateMovie = () => {
  const [onRequest, setOnRequest] = useState(false);
  const { dispatch } = useContext(CreateMovieContext);
  const { movieStatus, movieGenres } = useMovieStatusAndGenres();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      tagline: "",
      budget: "",
      revenue: "",
      status: "",
      adult: "false",
      runtime: "",
      release_date: "",
      genre_ids: [],
      overview: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schemaCreateMoviePrimaryFacts),
  });

  const onSubmit = async (data) => {
    setOnRequest(true);
    const { response, err } = await apiCreateMovie.createMoviePrimary(data);
    setOnRequest(false);

    if (response) {
      dispatch(createMoviePrimaryFacts(response));
      showToast("Saved succesffuly", "success");
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
          disabled={onRequest || !isDirty || !isValid}
          sx={{ width: "250px", padding: "15px 0px", borderRadius: "12px" }}
        >
          {onRequest ? "Loading..." : "Save"}
        </ButtonCostum>
      </Stack>
    </Box>
  );
};

export default FormCreateMovie;
