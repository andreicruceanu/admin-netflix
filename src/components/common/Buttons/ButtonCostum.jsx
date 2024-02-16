import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const ButtonStyled = styled(Button)({
  color: "#fff",
  backgroundColor: "#039",
  borderColor: "#039",
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    color: "#fff",
    borderColor: "#026",
    backgroundColor: "#002673",
  },
  "&.Mui-disabled": {
    opacity: ".6",
    color: "white",
    background: "#7f99cc",
  },
});

const ButtonCostum = ({
  type,
  variant,
  size,
  id,
  onClick,
  sx,
  loading,
  children,
  ...others
}) => {
  return (
    <ButtonStyled
      id={id}
      type={type ? type : "button"}
      variant={variant}
      size={size}
      onClick={onClick}
      {...others}
      loading={loading}
      sx={{ ...sx }}
    >
      {loading && (
        <CircularProgress
          sx={{
            color: "white",
            mr: "10px",
            width: "20px !important",
            height: "20px !important",
          }}
        />
      )}

      {children}
    </ButtonStyled>
  );
};

export default ButtonCostum;
