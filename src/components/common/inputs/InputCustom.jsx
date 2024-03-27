import { Box, Typography, styled } from "@mui/material";
import ChangePassword from "../ChangePassword/ChangePassword";

const InputCustom = ({
  type,
  id,
  register,
  placeholder,
  label,
  name,
  required,
  errors,
  changePasswordProp,
  ...rest
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ContainerInput>
        <Label htmlFor={id}>{required ? label + " * " : label}</Label>
        <Box sx={{ position: "relative" }}>
          <Input
            id={id}
            name={id}
            className={errors && errors[name] && "error"}
            type={type}
            {...register(name, {
              required: { value: true, message: `${name} is required` },
            })}
            placeholder={placeholder}
            {...rest}
          />
          {changePasswordProp && <ChangePassword />}
        </Box>
      </ContainerInput>
      {errors && errors[name] && (
        <Typography
          variant="caption"
          sx={{ color: "red", marginTop: "5px !important", textAlign: "start" }}
        >
          {errors[name].message}
        </Typography>
      )}
    </Box>
  );
};

const ContainerInput = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const Label = styled("label")(() => ({
  marginBottom: "5px",
  fontSize: "12px",
  fontWeight: 600,
  display: "inline-block",
  textAlign: "start",
}));

const Input = styled("input")(() => ({
  background: "#f5f6fa",
  border: "1px solid #d5d5d5",
  borderRadius: "4px",
  fontSize: "14px",
  lineHeight: "19px",
  color: "#595959",
  padding: "13px 15px",
  outline: "none",
  width: "100% !important",
  "&.error": {
    border: "1px solid #e54949",
    textAlign: "start",
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
  "&:disabled": {
    background: "#ebebeb",
  },
  "@media (max-width:900px)": {
    background: "#fff",
    border: "1px solid #ced4da",
    "&::placeholder": {
      opacity: ".8",
    },
  },
}));

export default InputCustom;
