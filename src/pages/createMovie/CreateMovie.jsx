import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { CreateMovieContext } from "../../context/createMovieContext/CreateMovieContext";
import { useContext } from "react";
import ContainerContent from "../../components/common/container/ContainerContent";
import FormCreateMovie from "./FormCreateMovie";
import FormImages from "./FormImages";
import FormVideo from "./FormVideo";
import CompletedCreateMovie from "./CompletedCreateMovie";

const CreateMovie = () => {
  const { step, activeStep } = useContext(CreateMovieContext);

  function getStepContent(activeStep) {
    switch (activeStep) {
      case 0:
        return <FormCreateMovie />;
      case 1:
        return <FormImages />;
      case 2:
        return <FormVideo />;
      case 3:
        return <CompletedCreateMovie />;
      default:
        return "";
    }
  }

  return (
    <ContainerContent title={"Create Movie"}>
      <Box minWidth="750px">
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
