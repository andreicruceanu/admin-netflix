import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "../../utils/functions";
import { schemaCreateUser } from "../../utils/schemaValidation/SchemaCreateAdmin";
import ContainerContent from "../../components/common/container/ContainerContent";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import InputCustom from "../../components/common/inputs/InputCustom";
import SelectCustom from "../../components/common/inputs/SelectCustom";
import adminApi from "../../api/modules/admin.api";

const CreateAdmin = () => {
  const [onRequest, setOnRequest] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },

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
    mode: "onTouched",
    resolver: zodResolver(schemaCreateUser),
  });

  const onSubmit = async (data) => {
    setOnRequest(true);
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
    <ContainerContent title="Create New Admin">
      <Box component="form" minWidth="750px" onSubmit={handleSubmit(onSubmit)}>
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
            width="60%"
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
            disabled={onRequest || !isDirty || !isValid}
            sx={{ width: "250px", padding: "15px 0px", borderRadius: "12px" }}
          >
            {onRequest ? "Loading..." : "Create Admin"}
          </ButtonCostum>
        </Stack>
      </Box>
    </ContainerContent>
  );
};

export default CreateAdmin;
