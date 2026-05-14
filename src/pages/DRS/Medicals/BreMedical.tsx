import { Box, Container } from "@mui/material";
import CustomAccordion from "../../../component/ui/Accordion/Accordion";
import { GridSection } from "../../../component/layout/GridSection";

const BreMedicalDetails = [
  { label: "Decision", value: "Standard" },
  { label: "Decision Date", value: "01/04/2026" },
  { label: "Discrepancy", value: "NA" },
  { label: "Remarks", value: "No adversities observed" },
  { label: "Medical Decision", value: "Standard" },
  { label: "Medical Decision Date", value: "01/04/2026" },
  { label: "Discrepancy", value: "NA" },
  { label: "Remarks", value: "No adversities observed" },
];

const BreDetails = () => (
  <Box
    sx={{
      p: 2,
      mt: 2,
      boxShadow: 1,
      borderRadius: 2,
      backgroundColor: "#F6F6F6",
    }}
  >
    <Box sx={{ marginY: 1 }} />
    <GridSection columns={4} items={BreMedicalDetails} />
  </Box>
);

const BreMedical = () => {
  return (
    <Container
      disableGutters
      sx={{
        boxShadow: 3,
        marginTop: 2,
      }}
    >
      <CustomAccordion 
        title="BRE (Business Rules Engine)" 
        defaultExpanded
      >
        <BreDetails />
      </CustomAccordion>
    </Container>
  );
};

export default BreMedical;
