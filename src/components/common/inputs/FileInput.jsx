import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import uploadImg from "../../../assets/images/cloud-upload-regular-240.png";
import styled from "@emotion/styled";
import { ImageConfig } from "../../../utils/ImagesConfig";

const FileInput = ({ name, id, register, errors, setValue, label }) => {
  const [file, setFile] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const typeFile = file.type.split("/")[1];

    if (typeFile !== "png" && typeFile !== "jpeg" && typeFile !== "jpg") {
      return register(name).onChange(event);
    }

    if (file) {
      register(name).onChange(event);
      setFile([file]);
    }
  };

  const fileRemove = () => {
    setFile([]);
    setValue(name, []);
  };

  return (
    <Container>
      <ContainerInput className={errors && errors[name] && "error"}>
        {file.length > 0 ? (
          <>
            {file.map((item, index) => (
              <FileItem key={index}>
                <img
                  width="50px"
                  src={
                    ImageConfig[item.type.split("/")[1]] ||
                    ImageConfig["default"]
                  }
                  alt=""
                />
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.name}
                </Typography>
                <Button className="buttonDelete" onClick={() => fileRemove()}>
                  x
                </Button>
              </FileItem>
            ))}
          </>
        ) : (
          <>
            <Label>
              <img width="80px" src={uploadImg} alt="uploadImg" />
              <Typography variant="body2">{label}</Typography>
            </Label>
            <Input
              id={id}
              name={name}
              {...register(name, require)}
              onChange={handleFileChange}
              type="file"
              multiple={false}
            />
          </>
        )}
      </ContainerInput>
      {errors && errors[name] && (
        <Typography variant="caption" sx={{ mt: 3, color: "red" }}>
          {errors[name].message}
        </Typography>
      )}
    </Container>
  );
};

const Container = styled("div")(({}) => ({}));

const FileItem = styled("div")(({}) => ({
  display: "flex",
  alignItems: "center",
  "& img": {
    margin: "0 10px",
  },
}));

const ContainerInput = styled("div")(({}) => ({
  position: "relative",
  width: "200px",
  height: "150px",
  border: "2px dashed rgba(13,28,51,.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f8ff",
  "&.error": {
    border: "2px dashed red",
  },
  ":hover .buttonDelete": {
    opacity: 1,
  },
  ":hover": {
    boxShadow: "3px 3px 29px -11px #787878",
  },
}));

const Input = styled("input")(({}) => ({
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
}));

const Label = styled("div")(({}) => ({
  textAlign: "center",
}));

const Button = styled("button")(({}) => ({
  position: "absolute",
  bottom: "10px",
  borderRadius: "10px",
  outline: "none",
  border: "1px solid #c5dbe2",
  cursor: "pointer",
  width: "35px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  left: "50%",
  opacity: 0,
  backgroundColor: "#c5dbe2 ",
  transform: "translateX(-50%)",
  transition: "opacity 0.3s ease",
}));

export default FileInput;
