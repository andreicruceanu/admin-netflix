import { Box } from "@mui/material";
import React, { useContext } from "react";
import SuccesImages from "../../assets/images/Succes.svg";
import ButtonCostum from "../../components/common/Buttons/ButtonCostum";
import { createAnotherMovie } from "../../context/createMovieContext/CreateMovieAction";
import { CreateMovieContext } from "../../context/createMovieContext/CreateMovieContext";

const CompletedCreateMovie = () => {
  const { dispatch } = useContext(CreateMovieContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={SuccesImages} alt="Succes iamges" width="300px" />
      <ButtonCostum
        type="submit"
        size="large"
        variant="contained"
        sx={{
          width: "250px",
          padding: "15px 0px",
          borderRadius: "12px",
          mt: 2,
        }}
        onClick={() => dispatch(createAnotherMovie())}
      >
        Create another movie
      </ButtonCostum>
    </Box>
  );
};

export default CompletedCreateMovie;
