import { Typography, styled } from "@mui/material";
import "./styles.css";
const InputCustom = ({
  type,
  id,
  register,
  placeholder,
  label,
  name,
  required,
  errors,
}) => {
  return (
    <ContainerInput>
      <Label htmlFor={id}>{required ? label + " * " : label}</Label>
      <Input
        id={id}
        name={id}
        className={errors && errors[name] && "error"}
        type={type}
        {...register(name, { required })}
        placeholder={placeholder}
      />
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
};

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

const Input = styled("input")(({}) => ({
  background: "#f5f6fa",
  border: "1px solid #d5d5d5",
  borderRadius: "4px",
  fontSize: "14px",
  lineHeight: "19px",
  color: "#595959",
  padding: "13px 15px",
  outline: "none",
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

export default InputCustom;
