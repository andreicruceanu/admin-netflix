import { useForm } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaChangePassword } from "../../../utils/schemaValidation/SchemaChangePassword";
import { useState } from "react";
import { showToast } from "../../../utils/functions";
import InputCustom from "../inputs/InputCustom";
import ButtonCostum from "../Buttons/ButtonCostum";
import adminApi from "../../../api/modules/admin.api";

const ChangePasswordForm = ({ onClose }) => {
  const [onRequest, setOnRequest] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schemaChangePassword),
  });

  const onSubmit = async ({ newPassword }, event) => {
    event.preventDefault();
    setOnRequest(true);
    const { response, err } = await adminApi.changePassword({
      newPassword,
    });
    setOnRequest(false);
    if (response) {
      showToast("Password changed successfully!", "success");
      reset();
      onClose();
    }
    if (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <Box
      id="changePasswordForm"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack flexDirection="column" gap={3} mb={5}>
        <InputCustom
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter Password"
          label="New Password"
          required
          register={register}
          errors={errors}
        />
        <InputCustom
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Enter Password"
          label="Confirm Password"
          required
          register={register}
          errors={errors}
        />
      </Stack>

      <Stack mt={5} alignItems="center">
        <ButtonCostum
          type="submit"
          size="large"
          form="changePasswordForm"
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

export default ChangePasswordForm;
