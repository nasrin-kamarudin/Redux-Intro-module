import { Box } from "@mui/material";
import CustomAccordion from "../../component/ui/Accordion/Accordion";
import CustomTable, { type Column } from "../../component/ui/Table/Table";
import type { RequirementRow } from "../../types/drs.types";

const requirementRows = [
  {
    reqtName: "HbA1C",
    reqtCode: "H1C",
    typeOfReqt: "Medical",
    lifeAssuredOrProposer: "Life Assured",
    status: "Accepted",
    raisedDate: "27/03/2026",
    receivedDate: "29/03/2026",
  },
  {
    reqtName: "SMA 12 Group",
    reqtCode: "S12",
    typeOfReqt: "Medical",
    lifeAssuredOrProposer: "Life Assured",
    status: "Accepted",
    raisedDate: "27/03/2026",
    receivedDate: "01/04/2026",
  },
];

const requirementColumns: Column<RequirementRow>[] = [
  { key: "reqtName", header: "Reqt Name", width: "15%" },
  { key: "reqtCode", header: "Reqt Code", width: "12%" },
  { key: "typeOfReqt", header: "Type Of Reqt", width: "13%" },
  { key: "lifeAssuredOrProposer", header: "Client Type", width: "16%" },
  { key: "status", header: "Status", width: "10%" },
  { key: "raisedDate", header: "Raised Date", width: "14%" },
  { key: "receivedDate", header: "Received Date", width: "15%" },
];

const RequirementManagement = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <CustomAccordion title="Requirement Management">
        <CustomTable<RequirementRow>
          title="Requirement Management"
          columns={requirementColumns}
          data={requirementRows}
        />
      </CustomAccordion>
    </Box>
  );
};

export default RequirementManagement;
