import { Box, Container } from "@mui/material";
// import WarningIcon from "@mui/icons-material/Warning";
import CustomAccordion from "../../../component/ui/Accordion/Accordion";
import CustomTable from "../../../component/ui/Table/Table";
import type { Column } from "../../../component/ui/Table/Table";
import WarningBadgeIcon from "../../../component/ui/Badge/WarningBadgeIcon";

interface MedicalData extends Record<string, unknown> {
  parameter: string;
  value: number | string;
  unit: string;
  normalRange: string;
  status: "normal" | "abnormal";
}

const lftData: MedicalData[] = [
  {
    parameter: "Total Bilirubin",
    value: 0.8,
    unit: "mg/dL",
    normalRange: "0.3-1.2",
    status: "normal",
  },
  {
    parameter: "Direct Bilirubin",
    value: 0.2,
    unit: "mg/dL",
    normalRange: "0.0-0.3",
    status: "normal",
  },
  {
    parameter: "Indirect Bilirubin",
    value: 0.6,
    unit: "mg/dL",
    normalRange: "0.2-0.8",
    status: "normal",
  },
  {
    parameter: "SGOT (AST)",
    value: 28,
    unit: "U/L",
    normalRange: "0-40",
    status: "abnormal",
  },
  {
    parameter: "SGPT (ALT)",
    value: 32,
    unit: "U/L",
    normalRange: "0-41",
    status: "normal",
  },
  {
    parameter: "ALP (Alkaline Phosphatase)",
    value: 72,
    unit: "U/L",
    normalRange: "30-120",
    status: "normal",
  },
  {
    parameter: "Albumin",
    value: 3.8,
    unit: "g/dL",
    normalRange: "3.5-5.0",
    status: "normal",
  },
  {
    parameter: "Total Protein",
    value: 7.2,
    unit: "g/dL",
    normalRange: "6.0-8.3",
    status: "normal",
  },
  {
    parameter: "GGT",
    value: 28,
    unit: "U/L",
    normalRange: "0-30",
    status: "normal",
  },
];

const columns: Column<MedicalData>[] = [
  {
    key: "parameter" as const,
    header: "Parameter",
    width: "25%",
  },
  {
    key: "value" as const,
    header: "Value",
    width: "15%",
  },
  {
    key: "unit" as const,
    header: "Unit",
    width: "20%",
  },
  {
    key: "normalRange" as const,
    header: "Normal Range",
    width: "20%",
  },
  {
    key: "status" as const,
    header: "Status",
    width: "20%",
    render: (value: unknown) => {
      const status = value as MedicalData["status"];
      const isAbnormal = status === "abnormal";
      return (
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: isAbnormal ? "#f44336" : "#4caf50",
          }}
        />
      );
    },
  },
];

const LiverFunctionTest = ({ expanded, onExpandedChange }: { expanded?: boolean; onExpandedChange?: (expanded: boolean) => void }) => {
  const abnormalCount:number = lftData.filter(
    (item) => item.status === "abnormal"
  ).length;

  return (
    <Container
      disableGutters
      sx={{
        boxShadow: 3,
        marginTop: 2,
      }}
    >
      <CustomAccordion 
        title="Liver Function Test (LFT)" 
        chip={abnormalCount > 0 ? <WarningBadgeIcon count={abnormalCount} variant="Medium" /> : null}
        expanded={expanded}
        onChange={onExpandedChange}
    >
        <Box
          sx={{
            "& > div": {
              borderRadius: 0,
              padding: 0,
            },
          }}
        >
          <CustomTable
              data={lftData}
              columns={columns}
          />
        </Box>

      </CustomAccordion>
    </Container>
  );
};

export default LiverFunctionTest;