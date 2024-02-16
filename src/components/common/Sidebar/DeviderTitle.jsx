import { Divider, Typography } from "@mui/material";
import React from "react";

const DeviderTitle = ({ title }) => {
  return (
    <>
      <Divider
        sx={{
          m: "10px 0",
          background: "#E0E0E0",
        }}
      />
      <Typography
        color="#0f0f0f"
        sx={{
          m: "15px 0 5px 15px",
          textTransform: "uppercase",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
    </>
  );
};

export default DeviderTitle;
