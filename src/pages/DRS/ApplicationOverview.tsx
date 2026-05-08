import { Box } from "@mui/material";
import CustomAccordion from "../../component/ui/Accordion/Accordion";
import CustomTable, { type Column } from "../../component/ui/Table/Table";
import type { RiderRow } from "../../types/drs.types";
import { GridSection } from "../../component/layout/GridSection";

const applicationDetails = [
  { label: "Product Name", value: "ICICI PRU IPROTECT CARE" },
  { label: "Sum Assured", value: "50,00,000" },
  { label: "Channel", value: "AG" },
  { label: "Sub Channel", value: "AG1" },
  { label: "Agent Code", value: "00000046" },
  { label: "Agent Name", value: "Agent Company Mumbai" },
  { label: "Customer Type", value: "non HNI" },
  { label: "Policy Type", value: "Retail - New Business" },
  { label: "Modal Premium", value: "11243" },
  { label: "PT", value: "44" },
  { label: "PPT", value: "44" },
  { label: "Payment Mode", value: "Yearly" },
];

const riderRows: RiderRow[] = [
  {
    riderName: "ICICI Pru Non-Linked Accidental Death and Disability Rider",
    riderOption: "Accidental Total and Permanent Disability",
    riderPT: 44,
    riderSumAssured: 5000000,
    riderModalPremium: 2300,
    riderPPT: 44,
  },
  {
    riderName: "ICICI Pru Non-Linked Accidental Death and Disability Rider",
    riderOption: "Accidental Death Benefit",
    riderPT: 44,
    riderSumAssured: 5000000,
    riderModalPremium: 3300,
    riderPPT: 44,
  },
  {
    riderName: "ICICI Pru Non-Linked Health Protect Rider",
    riderOption: "Critical Illness - 60CI package",
    riderPT: 20,
    riderSumAssured: 1000000,
    riderModalPremium: 3876,
    riderPPT: 20,
  },
];

const riderColumns: Column<RiderRow>[] = [
  { key: "riderName", header: "Name", width: "30%" },
  { key: "riderOption", header: "Option", width: "20%" },
  { key: "riderPT", header: "PT", width: "5%" },
  { key: "riderSumAssured", header: "Sum Assured", width: "15%" },
  { key: "riderModalPremium", header: "Modal Premium", width: "15%" },
  { key: "riderPPT", header: "PPT", width: "10%" },
];

const ApplicationOverview = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <CustomAccordion title="Application Overview">
        <Box sx={{ p: 2, backgroundColor: "#f6f6f6", borderRadius: "8px" }}>
          <GridSection columns={6} items={applicationDetails} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTable<RiderRow>
            title="Rider Details"
            columns={riderColumns}
            data={riderRows}
          />
        </Box>
      </CustomAccordion>
    </Box>
  );
};

export default ApplicationOverview;
