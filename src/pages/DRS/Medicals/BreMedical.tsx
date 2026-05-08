import { Box, Container } from "@mui/material";
import CustomAccordion from "../../../component/ui/Accordion/Accordion";
import Badge from "../../../component/ui/Badge/Badge";
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

//   const [expandedItems, setExpandedItems] = useState<boolean[]>(
//     new Array(BreMedicalDetails.length).fill(false),
//   );


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
        chip={<Badge label="STD" variant="Low" />}
        defaultExpanded
      >
        {/* <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "0.8fr 2.5fr 2.5fr 1.5fr 0.5fr",
            gap: "16px",
            backgroundColor: "#f6f6f6",
            padding: "16px",
            marginTop: "8px",
            borderRadius: "8px",
          }}
        >
          {}
          {BreMedicalDetails.map((item, index) => {
            const isExpanded = expandedItems[index];
            const isLongText = item.value && item.value.length > 100;
            const isBreDiscrepancy = item.label === "BRE Discrepancy";

            return (
              <Box key={index} sx={{ ...columnFlex }}>
                <Typography sx={{ color: "#444444", fontSize: "12px" }}>
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    color: "#161616",
                    fontWeight: 600,
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: isExpanded ? "none" : 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.value}
                </Typography>

                {(isLongText || isBreDiscrepancy) && (
                  <Button
                    onClick={() =>
                      setExpandedItems((prev) => {
                        const newExpandedItems = [...prev];
                        newExpandedItems[index] = !newExpandedItems[index];
                        return newExpandedItems;
                      })
                    }
                    sx={{
                      color: "#007BFF",
                      fontSize: "14px",
                      p: 0,
                      alignSelf: "flex-start",
                      textTransform: "none",
                    }}
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </Button>
                )}
              </Box>
            );
          })}

          <Box
            sx={{
              ...centerFlex,
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#9A2529",
                border: "1px solid #9A2529",
                padding: 1,
                borderRadius: "8px",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <RefreshIcon />
            </Box>
          </Box>
        </Box> */}
      
        <BreDetails />
      </CustomAccordion>
    </Container>
  );
};

export default BreMedical;
