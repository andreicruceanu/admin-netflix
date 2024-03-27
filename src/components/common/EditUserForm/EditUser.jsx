import { useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, Box, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "../../../utils/functions";
import { schemaEditAdmin } from "../../../utils/schemaValidation/SchemaEditAdmin";
import InputCustom from "../inputs/InputCustom";
import ButtonCostum from "../Buttons/ButtonCostum";
import adminApi from "../../../api/modules/admin.api";

const EditUser = ({ data, onClose, setAllUsers }) => {
  const [onRequest, setOnRequest] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
    mode: "onTouched",
    resolver: zodResolver(schemaEditAdmin),
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
          disabled={onRequest || !isDirty || !isValid}
          sx={{ width: "250px", padding: "15px 0px", borderRadius: "12px" }}
        >
          {onRequest ? "Loading..." : "Save"}
        </ButtonCostum>
      </Stack>
    </Box>
  );
};

export default EditUser;
