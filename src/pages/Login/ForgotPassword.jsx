import { Alert, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import LoginBg from "../../assets/images/LoginBg.svg";
import InputCustom from "../../components/common/inputs/InputCustom";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckEmail from "../../assets/images/check-email.svg";
import useCountdown from "../../hooks/useCountnown";
import { formatSeconds, showToast } from "../../utils/functions";
import authApi from "../../api/modules/auth.api";
import { toast } from "react-toastify";
import { configsApp } from "../../configs/configsApp";
import ContainerAuth from "../../components/common/container/ContainerAuth";

const schema = z.object({
  email: z.string().email("Email is invalid !"),
});

const ForgotPassword = () => {
  const [onRequest, setOnRequest] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [email, setEmail] = useState("");

  const { secondsLeft, start } = useCountdown();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setEmail(data);
    setOnRequest(true);
    const { response, err } = await authApi.recoverPassword(data);
    setOnRequest(false);

    if (response) {
      start(configsApp.remainingSecondsToSendEmail);
      setIsMailSent(true);
      showToast("Email successfully sent to you.", "succes");
    }

    if (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsButtonEnabled(() => !isButtonEnabled);
    }
  }, [secondsLeft]);

  const handleSendEmailAgain = async () => {
    setOnRequest(true);
    const { response, err } = await authApi.recoverPassword(email);
    setOnRequest(false);
    if (response) {
      showToast("Email successfully sent to you.", "succes");
      start(configsApp.remainingSecondsToSendEmail);
      setIsButtonEnabled(() => !isButtonEnabled);
    }
    if (err) {
      toast.error(err.message);
    }
  };

  return (
    <ContainerAuth img={LoginBg} widthImg={70}>
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
            {isMailSent ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "400px",
                  textAlign: "center",
                }}
              >
                <img src={CheckEmail} alt="Check Email" width={110} />
                <Typography variant="h5" sx={{ fontWeight: 600, m: "10px 0" }}>
                  Check your email
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: "80%" }}>
                  We’ve sent the instructions to reset the password (also check
                  the Spam folder).
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center", mt: 7 }}>
                  Didn't receive mail? Send it again in
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ color: "#039", fontWeight: 600, ml: 1 }}
                  >
                    {formatSeconds(secondsLeft)}
                  </Typography>
                </Typography>
                <ButtonCostum
                  type="submit"
                  size="large"
                  variant="contained"
                  onClick={handleSendEmailAgain}
                  disabled={isButtonEnabled}
                  sx={{
                    borderRadius: "10px",
                    display: "flex",
                    width: "220px",
                    height: "52px",
                    mt: 2,
                  }}
                >
                  Send Again
                </ButtonCostum>
              </Box>
            ) : (
              <Box
                component="form"
                maxWidth={400}
                width="100% "
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={3}>
                  <Box sx={{ mb: "10px !important" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Forgot password?
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Fill in the fields below to access your account
                    </Typography>
                  </Box>
                  <InputCustom
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    label="Email"
                    register={register}
                    required
                    errors={errors}
                  />

                  <ButtonCostum
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={onRequest}
                    loading={onRequest}
                  >
                    {onRequest ? "Loading..." : "Recover the password"}
                  </ButtonCostum>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ContainerAuth>
  );
};

export default ForgotPassword;
