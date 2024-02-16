import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  circularProgressClasses,
  colors,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/logo.png";
import LoginBg from "../../assets/images/LoginBg.svg";
import TwoFactorImg from "../../assets/images/two-factor.svg";
import { AuthContext } from "../../context/authContext/AuthContext";
import authApi from "../../api/modules/auth.api";
import { configsApp } from "../../configs/configsApp";
import useCountdown from "../../hooks/useCountnown";
import { toast } from "react-toastify";
import { convertOTPtoNumber, formatSeconds } from "../../utils/functions";
import { loginSuccess } from "../../context/authContext/AuthActions";
import { useNavigate } from "react-router-dom";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import LoadingAnimate from "../../components/common/loading/LoadingAnimate";
import ContainerAuth from "../../components/common/container/ContainerAuth";

const TwoFA = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animationLogin, setAnimationLogin] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);

  const [otp, setOtp] = useState(
    new Array(configsApp.twoFACodeLength).fill("")
  );
  const inputRefs = useRef([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const { twoFAUser, dispatch } = useContext(AuthContext);
  const { secondsLeft, start } = useCountdown();

  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMail = async () => {
      const { response, err } = await authApi.sendEmail2FA({
        email,
      });
      if (response) {
        toast.success(
          `We've sent you a verification code to your email address.(${email})`
        );
        start(configsApp.remainingSecondsToSendEmail);
      }
      if (err) {
        toast.error(err.message);
      }
    };

    fetchMail();
  }, [email]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsButtonEnabled(() => !isButtonEnabled);
    }
  }, [secondsLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    const nextIndex = index + 1;
    if (nextIndex < otp.length) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSendEmailAgain = async () => {
    const { response, err } = await authApi.sendEmail2FA({
      email,
    });
    if (response) {
      toast.success(
        `We've sent you a verification code to your email address.(${email})`
      );
      start(configsApp.remainingSecondsToSendEmail);
      setIsButtonEnabled(() => !isButtonEnabled);
    }
    if (err) {
      toast.error(err.message);
    }
  };

  const [onRequestSendCode, setOnRequestSendCode] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);

  const handleSubmitCode = async (event) => {
    event.preventDefault();

    if (otp.some((value) => value === "" || value === " ")) {
      return setErrorOTP(true);
    }
    setErrorOTP(false);
    const code = convertOTPtoNumber(otp);
    setOnRequestSendCode(true);
    const { response, err } = await authApi.verifyCode2FA({ code });
    setOnRequestSendCode(false);

    if (response && response.result) {
      dispatch(loginSuccess(twoFAUser));
      window.scrollTo(0, 0);
      setAnimationLogin(true);
      const interval = setInterval(() => {
        setLoginProgress((prev) => prev + 100 / 40);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
      }, 2000);

      setTimeout(() => {
        setIsLoggedIn(true);
      }, 2100);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2800);
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
          minWidth: isLoggedIn
            ? "100%"
            : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: { xs: "#F3F4F4", md: "white" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: animationLogin ? 0 : 1,
            transition: "all 0.3s ease-in-out",
            height: "100%",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <img src={Logo} alt="logo" height={60} />
          </Box>

          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "350px",
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              sx={{ mb: { xs: 7, md: 3 } }}
            >
              <img src={TwoFactorImg} alt="TwoFactorImg" width={110} />
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 3, mb: 2 }}>
                Two-factor authentication
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                We sent you a 6 digit code, check your email, copy the number
                and paste it below.
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  mt: 5,
                  mb: 3,
                }}
                onSubmit={handleSubmitCode}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "15px", fontWeight: "600", mb: 2 }}
                >
                  Verification code*
                </Typography>
                <Stack direction="row" spacing={2}>
                  {otp.map((value, index) => {
                    return (
                      <TextField
                        key={index}
                        type="text"
                        value={value}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        sx={{
                          width: { xs: "40px", md: "50px" },
                          height: { xs: "40px", md: "50px" },
                          fontSize: "16px",
                          fontWeight: "800",
                          "& .MuiInputBase-input ": {
                            padding: { xs: "9px 0px !important" },
                          },
                        }}
                        inputProps={{
                          maxLength: 1,
                          inputMode: "numeric",
                          style: {
                            fontSize: "16px",
                            fontWeight: "800",
                            textAlign: "center",
                          },
                        }}
                      />
                    );
                  })}
                </Stack>
                {errorOTP && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#e54949", mt: 2.4 }}
                  >
                    Code is required !
                  </Typography>
                )}
                <ButtonCostum
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={onRequestSendCode}
                  loading={onRequestSendCode}
                  sx={{
                    borderRadius: "10px",
                    display: "flex",
                    width: "220px",
                    height: "52px",
                    mt: 6,
                  }}
                >
                  {onRequestSendCode ? "Loading..." : "Login"}
                </ButtonCostum>
              </Box>
              <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
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
                onClick={handleSendEmailAgain}
                disabled={isButtonEnabled}
                variant="contained"
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
            </Stack>
          </Box>
        </Box>
      </Box>
      {animationLogin && <LoadingAnimate loginProgress={loginProgress} />}
    </ContainerAuth>
  );
};

export default TwoFA;
