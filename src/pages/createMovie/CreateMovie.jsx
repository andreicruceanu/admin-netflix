import { Box, Step, StepLabel, Stepper } from "@mui/material";
import ContainerContent from "../../components/common/container/ContainerContent";
import FormCreateMovie from "./FormCreateMovie";
import { useState } from "react";

const CreateMovie = () => {
  const [activeStep, setActiveStep] = useState(0);

  const step = ["Primary Facts", "Images", "videos"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormCreateMovie handleNext={handleNext} />;
      case 1:
        return <FormCreateMovie />;
      case 2:
        return <FormCreateMovie />;
      default:
        return "unknown step";
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
          {step.map((label, index) => (
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
