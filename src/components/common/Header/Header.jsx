import { Box, Typography } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color="grey"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="body">{subtitle}</Typography>
    </Box>
  );
};

export default Header;
