import { Box, Typography, styled } from "@mui/material";

const TextareaCostum = ({
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
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ContainerInput>
        <Label htmlFor={id}>{required ? label + " * " : label}</Label>
        <TextArea
          id={id}
          name={id}
          cols={5}
          rows={5}
          className={errors && errors[name] && "error"}
          type={type}
          {...register(name, { required: `${name} is required` })}
          placeholder={placeholder}
        />
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

const ContainerInput = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const Label = styled("label")(({}) => ({
  marginBottom: "5px",
  fontSize: "12px",
  fontWeight: 600,
  display: "inline-block",
  textAlign: "start",
}));

const TextArea = styled("textarea")(({}) => ({
  background: "#f5f6fa",
  border: "1px solid #d5d5d5",
  borderRadius: "4px",
  fontSize: "14px",
  lineHeight: "19px",
  color: "#595959",
  padding: "13px 15px",
  resize: "none",
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

export default TextareaCostum;
