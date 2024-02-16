import {
  Box,
  CircularProgress,
  Stack,
  circularProgressClasses,
  colors,
} from "@mui/material";
import React from "react";

const LoadingAnimate = ({ loginProgress }) => {
  return (
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
  );
};

export default LoadingAnimate;
