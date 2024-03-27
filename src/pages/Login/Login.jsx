import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext/AuthContext";
import Logo from "../../assets/images/logo.png";
import LoginBg from "../../assets/images/LoginBg.svg";
import Animate from "../../components/common/animate/Animate";

import {
  loginEnd,
  loginFailure,
  loginSaveToken,
  loginStart,
  loginSuccess,
} from "../../context/authContext/AuthActions";
import authApi from "../../api/modules/auth.api";
import { Link, useNavigate } from "react-router-dom";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import { configsApp } from "../../configs/configsApp";
import InputCustom from "../../components/common/inputs/InputCustom";
import ContainerAuth from "../../components/common/container/ContainerAuth";
import LoadingAnimate from "../../components/common/loading/LoadingAnimate";
import { showToast } from "../../utils/functions";

const schema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .regex(
      configsApp.rulesPassword,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character"
    ),
});

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);
  const [animationLogin, setAnimationLogin] = useState(false);

  const { isFetching, dispatch, error } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

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
      dispatch(loginSaveToken(response));
      if (response.twoFactorAuth) {
        return navigate("/auth/two-factor");
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
      showToast(err.message, "error");
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
                  <ButtonCostum
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={isFetching}
                    loading={isFetching}
                  >
                    {isFetching ? "Loading..." : "Login"}
                  </ButtonCostum>
                  {error && (
                    <Box sx={{ marginTop: 2 }}>
                      <Alert severity="error">{error}</Alert>
                    </Box>
                  )}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "Black",
                            fontSize: "13px",
                            fontWeight: 600,
                          },
                        }}
                        control={
                          <Checkbox
                            sx={{
                              color: "Black",
                              fontWeight: 600,
                            }}
                          />
                        }
                        label="Remember me"
                      />
                    </FormGroup>
                    <Typography sx={{ cursor: "pointer" }}>
                      <Typography
                        component={Link}
                        to="/auth/recover-password"
                        sx={{
                          textDecoration: "none",
                          color: "Black",
                          fontSize: "13px",
                          fontWeight: 600,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Forgot password?
                      </Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Animate>
          </Box>
        </Box>
      </Box>
      {animationLogin && <LoadingAnimate loginProgress={loginProgress} />}
    </ContainerAuth>
  );
};

export default Login;
