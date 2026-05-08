import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  type StepIconProps,
} from "@mui/material";
import { KeyRightArrowIcon } from "../../icons/Icons";
import { centerFlex } from "../../utils/styles";

const journeySteps = [
  "Digidrive Journey",
  "Requirement",
  "OCR",
  "BRE",
  "Underwriting",
  "Issuance",
];

const stepperStyles = {
  width: "100%",
  my: 2,
  flexWrap: { xs: "wrap", md: "nowrap" },
  rowGap: 1.5,
  columnGap: 3,
  alignItems: "center",
  justifyContent: "space-between",

  "& .MuiStep-root": {
    p: 0,
    flex: { xs: "0 0 auto", md: "1 1 0" },
    minWidth: 0,
  },

  "& .MuiStepLabel-root": {
    m: 0,
  },

  "& .MuiStepLabel-labelContainer": {
    ml: 1,
  },

  // default (future)
  "& .MuiStepIcon-root, & .MuiStepLabel-label": {
    color: "#9ca3af",
  },

  // completed
  "& .MuiStepIcon-root.Mui-completed, & .MuiStepLabel-label.Mui-completed": {
    color: "#218311",
  },

  // active
  "& .MuiStepIcon-root.Mui-active, & .MuiStepLabel-label.Mui-active": {
    color: "#F58220",
    fontWeight: 700,
  },
};

const getArrowColor = (index: number, activeStep: number): string => {
  if (index < activeStep) return "#35A224";
  if (index === activeStep) return "#F58220";
  return "#BBBBBB";
};

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;

  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: completed
          ? "#35A224"
          : active
          ? "#F58220"
          : "#9ca3af",
        color: "#fff",
      }}
    >
      {icon}
    </Box>
  );
};

const DRSHeader = () => (
  <Container
    disableGutters
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px 8px 0 0",
      boxShadow: 3,
      borderBottom: "1px solid",
      py: 2,
      px: 2,
    }}
  >
    <Typography component="span" sx={{fontSize: 20, fontWeight: 700}}>
      Application journey
    </Typography>
    <Typography component="span" sx={{fontSize: 20, fontWeight: 400, paddingLeft: 1}}>
      - OB25175112
    </Typography>
  </Container>
);

const ApplicationJourney = () => {
  const activeStep = 4;

  return (
    <>
      <DRSHeader />
      <Container
        disableGutters
        sx={{
          backgroundColor: "#fff",
          borderRadius: "0 0 8px 8px",
          boxShadow: 2,
        }}
      >
        <Box sx={{ px: 5, ...centerFlex }}>
          <Stepper activeStep={activeStep} connector={null} sx={stepperStyles}>
            {journeySteps.map((label, index) => (
              <Step key={label}>
                <StepLabel slots={{ stepIcon: CustomStepIcon }} sx={{ minWidth: "max-content" }}>
                  {label}

                  {index < journeySteps.length - 1 && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        display: "inline-flex",
                        color: getArrowColor(index, activeStep),
                      }}
                    >
                      <KeyRightArrowIcon />
                    </Box>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>
    </>
  );
};

export default ApplicationJourney;