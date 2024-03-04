import { Box, Step, StepLabel, Stepper } from "@mui/material";
import ContainerContent from "../../components/common/container/ContainerContent";
import FormCreateMovie from "./FormCreateMovie";
import { useContext } from "react";
import FormImages from "./FormImages";
import { CreateMovieContext } from "../../context/createMovieContext/CreateMovieContext";

const CreateMovie = () => {
  const { step, activeStep, movieData } = useContext(CreateMovieContext);

  console.log(step, activeStep, movieData);

  function getStepContent(activeStep) {
    switch (activeStep) {
      case 0:
        return <FormCreateMovie />;
      case 1:
        return <FormImages />;
      case 2:
        return <FormCreateMovie />;
      default:
        return "";
    }
  }

  return (
    <ContainerContent title={"Create Movie"}>
      <Box minWidth="750px" mt>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ m: "20px 0 50px" }}
        >
          {step &&
            step.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
        </Stepper>
        {getStepContent(activeStep)}
      </Box>
    </ContainerContent>
  );
};

export default CreateMovie;
