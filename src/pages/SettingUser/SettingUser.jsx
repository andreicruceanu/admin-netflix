import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, Box, Stack } from "@mui/material";
import { AuthContext } from "../../context/authContext/AuthContext";
import { showToast } from "../../utils/functions";
import { schemaUpdateAdmin } from "../../utils/schemaValidation/SchemaUpdateAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "../../components/common/inputs/InputCustom";
import ContainerContent from "../../components/common/container/ContainerContent";
import SelectCustom from "../../components/common/inputs/SelectCustom";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import adminApi from "../../api/modules/admin.api";

const SettingUser = () => {
  const [onRequest, setOnRequest] = useState(false);

  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: "**********",
      role: user.role,
    },
    mode: "onTouched",
    resolver: zodResolver(schemaUpdateAdmin),
  });

  const onSubmit = async (data) => {
    setOnRequest(true);
    const { response, err } = await adminApi.updateAdmin(data);
    setOnRequest(false);

    if (response) {
      showToast("Succesfuly update admin", "success");
    }

    if (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <ContainerContent title="Setting User">
      <Box component="form" minWidth="750px" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", with: "100%", justifyContent: "center" }}>
          <Avatar sx={{ width: "60px", height: "60px", mb: 2 }} />
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
            disabled
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
            disabled
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
            changePasswordProp={true}
            disabled
          />
          <SelectCustom
            type="select"
            id="role"
            label="Role"
            required
            width="60%"
            {...register("role")}
            errors={errors}
            disabled
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
            {onRequest ? "Loading..." : "Save"}
          </ButtonCostum>
        </Stack>
      </Box>
    </ContainerContent>
  );
};

export default SettingUser;
