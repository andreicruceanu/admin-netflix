import { Avatar, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import InputCustom from "../inputs/InputCustom";
import { useForm } from "react-hook-form";
import ButtonCostum from "../Buttons/ButtonCostum";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import adminApi from "../../../api/modules/admin.api";
import { showToast } from "../../../utils/functions";

const schemaEditUser = z.object({
  firstName: z.string().min(1, "FirstName is required").min(3),
  lastName: z.string().min(1, "LastName is required"),
  email: z.string().email("Email is invalid !"),
});

const EditUser = ({ data, onClose, setAllUsers }) => {
  const [onRequest, setOnRequest] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
    resolver: zodResolver(schemaEditUser),
  });

  const onSubmit = async (updateUser) => {
    setOnRequest(true);
    const { response, err } = await adminApi.updateUser({
      ...updateUser,
      userId: data.id,
    });
    setOnRequest(false);
    if (response) {
      showToast("Succesfuly update user", "success");
      setAllUsers((prev) =>
        prev.map((user) => (user.id === response.id ? response : user))
      );
      onClose();
    }
    if (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <Avatar
          sx={{ width: 70, height: 70, backgroundPosition: "center" }}
          src={data.profilePicture}
        />
      </Box>
      <Stack flexDirection="row" gap={5} mb={5}>
        <InputCustom
          id="firstName"
          type="text"
          placeholder="Enter firstname"
          label="First Name"
          name="firstName"
          required
          register={register}
          errors={errors}
        />
        <InputCustom
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter Lastname"
          label="Last Name"
          register={register}
          required
          errors={errors}
        />
      </Stack>

      <Stack flexDirection="row" gap={5} mb={5}>
        <InputCustom
          id="email"
          name="email"
          type="email"
          placeholder="Enter Email"
          label="Email"
          register={register}
          required
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

export default EditUser;
