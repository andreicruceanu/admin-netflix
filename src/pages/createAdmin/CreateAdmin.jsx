import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import InputCustom from "../../components/common/inputs/InputCustom";
import { useForm } from "react-hook-form";
import SelectCustom from "../../components/common/inputs/SelectCustom";
import { z } from "zod";
import { configsApp } from "../../configs/configsApp";
import { zodResolver } from "@hookform/resolvers/zod";
import adminApi from "../../api/modules/admin.api";

import { showToast } from "../../utils/functions";

const schemaCreateUser = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(1, "LastName is Required"),
  email: z.string().email("Email is invalid !"),
  username: z.string().min(5),
  password: z
    .string("Password is required")
    .regex(
      configsApp.rulesPassword,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character"
    ),
  role: z.enum(["admin", "guest", "owner"]),
});

const CreateAdmin = () => {
  const [onRequest, setOnRequest] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      role: "",
    },
    resolver: zodResolver(schemaCreateUser),
  });

  const onSubmit = async (data) => {
    setOnRequest(true);

    console.log(data);
    const { response, err } = await adminApi.createAdmin(data);
    setOnRequest(false);

    if (response) {
      showToast("Succesfuly create admin", "success");
      reset();
    }

    if (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="h3" sx={{ fontWeight: 600, mb: 4 }}>
        Create New Admin
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          height: "640px",
          border: "0.3px solid #B9B9B9",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          minWidth="750px"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <InputCustom
              type="text"
              id="username"
              name="username"
              placeholder="Enter UserName"
              label="Username"
              register={register}
              required
              errors={errors}
            />
          </Stack>

          <Stack flexDirection="row" gap={5}>
            <InputCustom
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              label="Password"
              required
              register={register}
              errors={errors}
            />
            <SelectCustom
              type="select"
              id="role"
              label="Role"
              required
              {...register("role")}
              errors={errors}
            >
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </SelectCustom>
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
              {onRequest ? "Loading..." : "Create Admin"}
            </ButtonCostum>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAdmin;
