import { Box, Container, Typography } from "@mui/material";
import CustomAccordion from "../../component/ui/Accordion/Accordion";
import { useState } from "react";
import { centerFlex, columnFlex } from "../../utils/styles";
import { RefreshIcon } from "../../icons/Icons";
import Badge from "../../component/ui/Badge/Badge";
import CustomDialog from "../../component/ui/Dialog/Dialog";

const BreDetails = [
  { label: "BRE Status", value: "Success" },
  {
    label: "BRE Remarks",
    value:
      "Check Basic KYC Document Attestations, Standard Age Proof Required, UW Control, Mandatory medicals applicable as per revised guidelines, Model Output : Green, Standard Age Proof Required For This Rider Type, Videography Medical Examination Report eligible case, Top City Pincode, Accuity Cas, Income Proof Required for Protection, Revised COVID guidelines,  Revised Income Document, TopCOs, Munich Re approved Top Company list",
  },
  {
    label: "BRE Discrepancy",
    value:
      "IDM, ADP, KYP, AGE, UAC, PAN, PAL, ECG, RUA, HV1, AUS, H1C, COT, MER, S13, ACR, OCD, ACY, EID",
  },
  { label: "BRE Timestamp", value: "01/04/2026, 1300hrs" },
];

const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  const truncated = text.slice(0, limit);
  return truncated.slice(0, truncated.lastIndexOf(" "));
};

const BreDecision = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: string;
  } | null>(null);

  return (
    <Container
      disableGutters
      sx={{
        mt: 2,
      }}
    >
      <CustomAccordion
        title="BRE Decision"
        chip={<Badge label="STD" variant="Low" />}
      >
        <Box
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
          {BreDetails.map((item, index) => {
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
                    lineHeight: "20px",
                    maxHeight: "40px",
                    overflow: "hidden",
                  }}
                >
                  {truncateText(item.value, 80)}

                  {(isLongText || isBreDiscrepancy) && "... "}

                  {(isLongText || isBreDiscrepancy) && (
                    <Box
                      component="span"
                      onClick={() => {
                        setSelectedItem(item);
                        setDialogOpen(true);
                      }}
                      sx={{
                        color: "#063E6F",
                        cursor: "pointer",
                        fontWeight: 500,
                        textDecoration: "underline"
                      }}
                    >
                      show more
                    </Box>
                  )}
                </Typography>
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
        </Box>

        <CustomDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title={
            <Typography
              sx={{
                color: "#063E6F",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: "20px",
              }}
            >
              {selectedItem?.label?.replace("BRE ", "")}
            </Typography>
          }
          contentSx={{ whiteSpace: "pre-wrap" }}
        >
          <Typography sx={{ fontSize: "14px", color: "#161616" }}>
            {selectedItem?.value}
          </Typography>
        </CustomDialog>
      </CustomAccordion>
    </Container>
  );
};

export default BreDecision;
