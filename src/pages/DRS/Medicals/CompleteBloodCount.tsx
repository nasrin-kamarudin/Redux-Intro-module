import { Box, Container } from "@mui/material";
import CustomAccordion from "../../../component/ui/Accordion/Accordion";
import CustomTable from "../../../component/ui/Table/Table";
import type { Column } from "../../../component/ui/Table/Table";
import WarningBadgeIcon from "../../../component/ui/Badge/WarningBadgeIcon";

interface CBCData extends Record<string, unknown> {
  parameter: string;
  value: number | string;
  unit: string;
  normalRange: string;
  status: "normal" | "abnormal";
}
//   const [expandedItems, setExpandedItems] = useState<boolean[]>(
//     new Array(BreMedicalDetails.length).fill(false),
//   );

const cbcData: CBCData[] = [
  {
    parameter: "Haemoglobin",
    value: 14.5,
    unit: "g/dL",
    normalRange: "13.0-17.0",
    status: "normal",
  },
  {
    parameter: "RBC Count",
    value: 5.2,
    unit: "million/µL",
    normalRange: "4.5-5.5",
    status: "normal",
  },
  {
    parameter: "WBC Count",
    value: 7.8,
    unit: "thousand/µL",
    normalRange: "4.0-11.0",
    status: "normal",
  },
  {
    parameter: "Platelet Count",
    value: 480,
    unit: "thousand/µL",
    normalRange: "150-400",
    status: "abnormal",
  },
  {
    parameter: "Hematocrit",
    value: 42,
    unit: "%",
    normalRange: "40-50",
    status: "normal",
  },
  {
    parameter: "MCV",
    value: 88,
    unit: "fL",
    normalRange: "80-100",
    status: "normal",
  },
  {
    parameter: "MCH",
    value: 29,
    unit: "pg",
    normalRange: "27-31",
    status: "normal",
  },
  {
    parameter: "MCHC",
    value: 38,
    unit: "g/dL",
    normalRange: "32-36",
    status: "abnormal",
  },
  {
    parameter: "Neutrophils",
    value: 62,
    unit: "%",
    normalRange: "40-70",
    status: "normal",
  },
  {
    parameter: "Lymphocytes",
    value: 30,
    unit: "%",
    normalRange: "20-40",
    status: "normal",
  },
  {
    parameter: "Monocytes",
    value: 10,
    unit: "%",
    normalRange: "2-8",
    status: "abnormal",
  },
  {
    parameter: "Eosinophils",
    value: 2,
    unit: "%",
    normalRange: "1-4",
    status: "normal",
  },
];

const columns: Column<CBCData>[] = [
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
      const status = value as CBCData["status"];
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


const CBCTable = ({ expanded, onExpandedChange }: { expanded?: boolean; onExpandedChange?: (expanded: boolean) => void }) => {
  const abnormalCount = cbcData.filter(
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
        {/* CBC Section */}
      <CustomAccordion 
        title="Complete Blood Count (CBC)" 
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
              data={cbcData}
              columns={columns}
          />
        </Box>
      </CustomAccordion>
    </Container>
    
  );
}

export default CBCTable;
