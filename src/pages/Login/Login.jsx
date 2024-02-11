import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Link,
  Stack,
  TextField,
  Typography,
  circularProgressClasses,
  colors,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Logo from "../../assets/images/logo.png";
import LoginBg from "../../assets/images/LoginBg.svg";
import Animate from "../../components/animate/Animate";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext/AuthContext";

import {
  loginEnd,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../context/authContext/AuthActions";
import authApi from "../../api/modules/auth.api";
import { useNavigate } from "react-router-dom";

const RulesPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const schema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      RulesPassword,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character"
    ),
});

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);
  const [animationLogin, setAnimationLogin] = useState(false);

  const { isFetching, dispatch, error, twoFAUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());
    const { response, err } = await authApi.login(data);
    dispatch(loginEnd(response));
    if (response) {
      localStorage.setItem("jwt_token", response.token);
      localStorage.setItem("email", response.email);
      if (response.twoFactorAuth) {
        navigate("/auth/two-factor");
      } else {
        dispatch(loginSuccess(response));
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
        }, 2400);
      }
    }

    if (err) {
      dispatch(loginFailure(err.message));
    }
  };

  console.log(twoFAUser);

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          position: "absolute",
          right: 0,
          height: "100%",
          width: "70%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${LoginBg})`,
          backgroundColor: "#f4f4f4",
        }}
      />
      {/* background box */}

      {/* Login form */}
      <Box
        sx={{
          position: "absolute",
          left: "0",
          minHeight: "100%",
          minWidth: isLoggedIn
            ? "100%"
            : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
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
            opacity: animationLogin ? 0 : 1,
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={Logo} alt="logo" height={60}></img>
            </Animate>
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
                width="100% "
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={3}>
                  <TextField
                    id="username"
                    name="username"
                    label="username"
                    fullWidth
                    {...register("username")}
                  />
                  {errors.username && (
                    <Typography
                      variant="caption"
                      sx={{ color: "red", marginTop: "5px !important" }}
                    >
                      {errors.username.message}
                    </Typography>
                  )}
                  <TextField
                    {...register("password")}
                    label="password"
                    type="password"
                    name="password"
                    id="password"
                    fullWidth
                  />
                  {errors.password && (
                    <Typography
                      variant="caption"
                      sx={{ color: "red", marginTop: "5px !important" }}
                    >
                      {errors.password.message}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="success"
                    disabled={isFetching}
                  >
                    {isFetching ? "Loading..." : "sign in"}
                  </Button>
                  {error && (
                    <Box sx={{ marginTop: 2 }}>
                      <Alert severity="error" variant="filled">
                        {error}
                      </Alert>
                    </Box>
                  )}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                    </FormGroup>
                    <Typography
                      color="error"
                      fontWeight="bold"
                      sx={{ cursor: "pointer" }}
                    >
                      <Link to="#">Forgot password?</Link>
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Animate>
          </Box>
        </Box>
      </Box>

      {/* loading box */}
      {animationLogin && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            display: "flex",
            height: "100%",
            width: { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
            left: 0,
            mb: 6,
            bgcolor: colors.common.white,
            zIndex: 1000,
          }}
        >
          <Box position="relative">
            <CircularProgress
              variant="determinate"
              sx={{ color: colors.grey[200] }}
              size={100}
              value={100}
            />
            <CircularProgress
              variant="determinate"
              disableShrink
              value={loginProgress}
              size={100}
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: "round",
                },
                position: "absolute",
                left: 0,
                color: colors.green[600],
              }}
            />
          </Box>
        </Stack>
      )}
      {/* loading box */}
      {/* Login form */}
    </Box>
  );
};

export default Login;
