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
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";

const RulesPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const schema = z.object({
  email: z.string().min(3),
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
  const [onRequest, setOnRequest] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);

  const { isFetching, dispatch, error } = useContext(AuthContext);

  console.log(error);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ ...data }) => {
    login(data, dispatch);
  };

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "70%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${LoginBg})`,
          backgroundColor: "#f5f5f5",
        }}
      />
      {/* background box */}

      {/* Login form */}
      <Box
        sx={{
          position: "absolute",
          left: "0",
          height: "100%",
          width: isLoggedIn
            ? "100%"
            : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: colors.common.white,
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
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              <Box
                component="form"
                maxWidth={400}
                width="100% "
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={3}>
                  <TextField
                    id="email"
                    name="email"
                    label="email"
                    fullWidth
                    {...register("email")}
                  />
                  {errors.email && (
                    <Typography
                      variant="caption"
                      sx={{ color: "red", marginTop: "5px !important" }}
                    >
                      {errors.email.message}
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
      {/* {isFetching && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
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
      )} */}
      {/* loading box */}
      {/* Login form */}
    </Box>
  );
};

export default Login;
