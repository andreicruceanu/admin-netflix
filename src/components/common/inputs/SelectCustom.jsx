import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
const SelectCustom = React.forwardRef(
  ({ id, label, required, children, name, onChange, onBlur, errors }, ref) => {
    return (
      <ContainerInput>
        <Label htmlFor={id}>{required ? label + " * " : label}</Label>
        <Select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          id={id}
        >
          {children}
        </Select>
        {errors && errors[name] && (
          <Typography
            variant="caption"
            sx={{ color: "red", marginTop: "5px !important" }}
          >
            {errors[name].message}
          </Typography>
        )}
      </ContainerInput>
    );
  }
);
const ContainerInput = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));
const Label = styled("label")(({}) => ({
  marginBottom: "5px",
  fontSize: "12px",
  fontWeight: 600,
}));

const Select = styled("select")(({}) => ({
  background: "#f5f6fa",
  border: "1px solid #d5d5d5",
  borderRadius: "4px",
  fontSize: "14px",
  lineHeight: "19px",
  color: "#595959",
  padding: "13px 15px",
  outline: "none",
  width: "60%",
  "&.error": {
    border: "1px solid #e54949",
  },
  "&.error:focus": {
    border: "1px solid #e54949",
  },
  "&:focus": {
    border: "1px solid #99b8fe",
  },
  "&::placeholder": {
    opacity: "0.7",
  },
  "@media (max-width:900px)": {
    background: "#fff",
    border: "1px solid #ced4da",
    "&::placeholder": {
      opacity: ".8",
    },
  },
}));

export default SelectCustom;
