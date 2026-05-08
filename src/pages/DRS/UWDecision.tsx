import { Box, TextField, Typography } from "@mui/material";
import CustomAccordion from "../../component/ui/Accordion/Accordion";
import CustomTable, { type Column } from "../../component/ui/Table/Table";
import type {
  FinalUwDecisionRow,
  FirstUwDecisionRow,
} from "../../types/drs.types";
import { useState } from "react";
import CustomButton from "../../component/ui/Button/Button";

const firstUwDecisionRows: FirstUwDecisionRow[] = [
  {
    details: "Medical",
    decision: "Accepted",
    decisionCode: "ACC",
  },
  {
    details: "Financial",
    decision: "Pending",
    decisionCode: "PND",
  },
];

const firstUwDecisionColumns: Column<FirstUwDecisionRow>[] = [
  { key: "details", header: "Details", width: "31%" },
  { key: "decision", header: "Decision", width: "30%" },
  { key: "decisionCode", header: "Decision Code", width: "39%" },
];

const finalUwDecisionRows: FinalUwDecisionRow[] = [
  {
    uwDecision: "Accepted",
    uwDecisionCode: "ACC",
  },
  {
    uwDecision: "Rejected",
    uwDecisionCode: "REJ",
  },
];

const finalUwDecisionColumns: Column<FinalUwDecisionRow>[] = [
  { key: "uwDecision", header: "UW Decision", width: "50%" },
  { key: "uwDecisionCode", header: "UW Decision Code", width: "50%" },
];

const UWDecision = () => {
  const [uwDecisionRemarks, setUwDecisionRemarks] = useState("");

  return (
    <Box sx={{ mt: 2 }}>
      <CustomAccordion title="UW Decision">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 0.8fr",
            gap: 3,
            alignItems: "stretch",
            mt: 2,
          }}
        >
          <CustomTable<FirstUwDecisionRow>
            title="1st UW Decision"
            columns={firstUwDecisionColumns}
            data={firstUwDecisionRows}
          />

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              backgroundColor: "#D2D2D2",
              borderRadius: "2px",
            }}
          />

          <CustomTable<FinalUwDecisionRow>
            title="Final UW Decision"
            columns={finalUwDecisionColumns}
            data={finalUwDecisionRows}
          />
        </Box>

        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: "12px",
            backgroundColor: "#FAFAFA",
            border: "1px solid #E2E8F0",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#444",
              mb: 1,
            }}
          >
            Remarks
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={uwDecisionRemarks}
            onChange={(event) => setUwDecisionRemarks(event.target.value)}
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
          }}
        >
          <CustomButton
            variant="outlined"
            sx={{
              minWidth: 200,
              height: 44,
              borderRadius: "50px",
              fontWeight: 600,
              px: 3,
              whiteSpace: "nowrap",
            }}
          >
            Save
          </CustomButton>
          <CustomButton
            variant="contained"
            sx={{
              minWidth: 200,
              height: 44,
              borderRadius: "50px",
              fontWeight: 600,
              px: 3,
              whiteSpace: "nowrap",
            }}
          >
            Submit
          </CustomButton>
        </Box>
      </CustomAccordion>
    </Box>
  );
};

export default UWDecision;
