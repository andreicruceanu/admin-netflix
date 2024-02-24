import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import FileInput from "../../components/common/inputs/FileInput";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormImages = () => {
  const MAX_FILE_SIZE = 5000000;
  function checkFileType(file) {
    if (file?.name) {
      console.log(file);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(fileSchema) });

  const onSubmit = async (data) => {
    console.log(data);
  };

  console.log(errors);
  return (
    <Box component="form" minWidth="750px" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, textAlign: "center", mb: 7 }}
      >
        Upload images for movie created
      </Typography>
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
          sx={{ width: "250px", padding: "15px 0px", borderRadius: "12px" }}
        >
          Save
        </ButtonCostum>
      </Stack>
    </Box>
  );
};

export default FormImages;
