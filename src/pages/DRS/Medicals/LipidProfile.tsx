import { Box, Container } from "@mui/material";
// import Badge from "../../../component/ui/Badge/Badge";
import CustomAccordion from "../../../component/ui/Accordion/Accordion";
import CustomTable from "../../../component/ui/Table/Table";
import type { Column } from "../../../component/ui/Table/Table";
// import { DangerIcon } from "../../../icons/Icons";
import WarningBadgeIcon from "../../../component/ui/Badge/WarningBadgeIcon";

interface MedicalData extends Record<string, unknown> {
  parameter: string;
  value: number | string;
  unit: string;
  normalRange: string;
  status: "normal" | "abnormal";
}
//   const [expandedItems, setExpandedItems] = useState<boolean[]>(
//     new Array(BreMedicalDetails.length).fill(false),
//   );

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

const lipidProfileData: MedicalData[] = [
  {
    parameter: "Total Cholesterol",
    value: 220,
    unit: "mg/dL",
    normalRange: "<200",
    status: "abnormal",
  },
  {
    parameter: "LDL Cholesterol",
    value: 145,
    unit: "mg/dL",
    normalRange: "<100",
    status: "normal",
  },
  {
    parameter: "HDL Cholesterol",
    value: 45,
    unit: "mg/dL",
    normalRange: ">40",
    status: "normal",
  },
  {
    parameter: "Triglycerides",
    value: 165,
    unit: "mg/dL",
    normalRange: "<150",
    status: "abnormal",
  },
  {
    parameter: "VLDL",
    value: 33,
    unit: "mg/dL",
    normalRange: "2-30",
    status: "normal",
  },
  {
    parameter: "Total/HDL Ratio",
    value: 4.9,
    unit: "-",
    normalRange: "<5.0",
    status: "normal",
  },
];

const LipidProfileTable = ({ expanded, onExpandedChange }: { expanded?: boolean; onExpandedChange?: (expanded: boolean) => void }) => {
  const abnormalCount:number = lipidProfileData.filter(
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
        {/* Lipid Profile Section */}
        <CustomAccordion
            title="Lipid Profile"
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
                data={lipidProfileData}
                columns={columns}
            />
          </Box>
        </CustomAccordion>
      </Container>
  );
}

export default LipidProfileTable;
