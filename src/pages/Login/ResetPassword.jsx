import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { schemaResetPassword } from "../../utils/schemaValidation/SchemaResetPassword";
import { showToast } from "../../utils/functions";
import Logo from "../../assets/images/logo.png";
import SetPasswordImg from "../../assets/images/set-password.svg";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import Animate from "../../components/common/animate/Animate";
import InputCustom from "../../components/common/inputs/InputCustom";
import authApi from "../../api/modules/auth.api";
import ContainerAuth from "../../components/common/container/ContainerAuth";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("token");
  const navigate = useNavigate();
  const [onRequest, setOnRequest] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: zodResolver(schemaResetPassword),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setOnRequest(true);
    const { response, err } = await authApi.resetPassword({
      ...data,
      token: query,
    });
    setOnRequest(false);

    if (response && response.result) {
      showToast("Password changed successfully", "success");
    }

    if (err) {
      showToast(err.message, "error");
    }
  };

  useEffect(() => {
    if (!query) {
      navigate("/login");
    }
  }, [query]);

  return (
    <ContainerAuth img={SetPasswordImg} widthImg={70}>
      <Box
        sx={{
          position: "absolute",
          left: "0",
          minHeight: "100%",
          minWidth: { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: {
            xs: "#f3f4f4",
            md: "white",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all 0.3s ease-in-out",
            height: "100%",

            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <img src={Logo} alt="logo" height={60}></img>
          </Box>
          {/* logo */}

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Animate
              type="fade"
              sx={{ maxWidth: 400, width: "100%", padding: "0 30px" }}
            >
              <Box
                component="form"
                maxWidth={400}
                width="100%"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={3}>
                  <InputCustom
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter password"
                    label="New Password"
                    required
                    register={register}
                    errors={errors}
                  />
                  <InputCustom
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    label="Confirm password"
                    required
                    register={register}
                    errors={errors}
                  />

                  <ButtonCostum
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={onRequest || !isDirty || !isValid}
                    loading={onRequest}
                  >
                    {onRequest ? "Loading..." : "Save & go to Login"}
                  </ButtonCostum>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  ></Stack>
                </Stack>
              </Box>
            </Animate>
          </Box>
        </Box>
      </Box>
    </ContainerAuth>
  );
};

export default ResetPassword;
