import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import TextField from "./component/ui/TextField/TextField";
import SearchBar from "./component/ui/SearchBar/SearchBar";
import CustomButton from "./component/ui/Button/Button";
import CustomCheckbox from "./component/ui/Checkbox/Checkbox";
import Badge, { type BadgeVariant } from "./component/ui/Badge/Badge";
import CustomAccordion from "./component/ui/Accordion/Accordion";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useState } from "react";
import CustomTabs from "./component/ui/Tabs/Tabs";
import CustomTable, { type Column } from "./component/ui/Table/Table";
import type { ApplicantInfoTab, RequirementRow } from "./types/drs.types";
import KeyValueTable from "./component/ui/KeyValueTable/KeyValueTable";
import CustomDialog from "./component/ui/Dialog/Dialog";
import Inbox from "./pages/Inbox/Inbox";
import DRS from "./pages/DRS/DRS";
import MedicalRiskAnalytics from "./pages/DRS/Medicals/MedicalRiskAnalytics";

const CustomComponents = () => {
  const [applicantInfoTab, setApplicantInfoTab] =
    useState<ApplicantInfoTab>("personalKyc");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [duration, setDuration] = useState<number>();
  const [reason, setReason] = useState<string>("");

  const isBadgeVariant = (value: string): value is BadgeVariant =>
    ["Low", "Medium", "High"].includes(value);

  const applicantInfoTabs: { key: ApplicantInfoTab; label: string }[] = [
    { key: "personalKyc", label: "Personal & KYC" },
    { key: "contactAddress", label: "Contact & Address" },
    { key: "financialProfession", label: "Financial & Profession" },
    { key: "medicalLifestyle", label: "Medical & Lifestyle" },
    { key: "nominee", label: "Nominee" },
    { key: "generic", label: "Generic" },
    { key: "eia", label: "eIA" },
  ];

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
    { key: "reqtCode", header: "Reqt Code", width: "10%" },
    { key: "typeOfReqt", header: "Type Of Reqt", width: "13%" },
    { key: "lifeAssuredOrProposer", header: "Client Type", width: "16%" },
    { key: "status", header: "Status", width: "10%" },
    { key: "raisedDate", header: "Raised Date", width: "14%" },
    { key: "receivedDate", header: "Received Date", width: "15%" },
  ];

  const healthInformationRows = [
    {
      leftLabel: "Height",
      leftValue: "170 Cms",
      rightLabel: "Weight",
      rightValue: "70 Kgs",
    },
    {
      leftLabel: "Hypertension",
      leftValue: "No",
      rightLabel: "Heart Disease",
      rightValue: "No",
    },
    {
      leftLabel: "Kidney Disease",
      leftValue: "No",
      rightLabel: "Liver Disease",
      rightValue: "No",
    },
    {
      leftLabel: "Neurological Disorder",
      leftValue: "No",
      rightLabel: "Mental Disorder",
      rightValue: "No",
    },
    {
      leftLabel: "Any Surgery",
      leftValue: "No",
      rightLabel: "Hospitalization",
      rightValue: "No",
    },
    {
      leftLabel: "Family Heart Disease",
      leftValue: "No",
      rightLabel: "Family Cancer",
      rightValue: "No",
    },
  ];

  const reasonOptions = [
    { value: "tea", label: "Tea / Coffee Break" },
    { value: "lunch", label: "Lunch Break" },
    { value: "personal", label: "Personal Work" },
    { value: "meeting", label: "Internal Meeting" },
    { value: "system", label: "System Issue" },
  ];

  return (
    <>
      <Typography variant="h5">Button</Typography>
      <CustomButton variant="contained" sx={{ borderRadius: "50px" }}>
        Login
      </CustomButton>

      <Typography variant="h5">Text Field</Typography>
      <TextField fullWidth placeholder="enter your User ID" />
      <TextField fullWidth multiline minRows={2} />

      <Typography variant="h5">Search Bar</Typography>
      <SearchBar
        placeholder="search by application number..."
        onSearch={() => {}}
      />

      <Typography variant="h5">Checkbox</Typography>
      <CustomCheckbox label="Remember me" />

      <Typography variant="h5">Badge</Typography>
      {isBadgeVariant("Medium") && <Badge label="Low" variant="Low" />}
      {isBadgeVariant("Low") && <Badge label="Medium" variant="Medium" />}
      {isBadgeVariant("High") && <Badge label="High" variant="High" />}

      <Typography variant="h5">Accordion</Typography>
      <CustomAccordion title="Sample Accordion">
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </CustomAccordion>

      <Typography variant="h5">Tabs</Typography>
      <CustomTabs
        tabs={applicantInfoTabs}
        value={applicantInfoTab}
        onChange={setApplicantInfoTab}
        sx={{ mt: 1 }}
      />

      <Typography variant="h5">Table</Typography>
      <CustomTable<RequirementRow>
        title="Requirement Management"
        columns={requirementColumns}
        data={requirementRows}
      />

      <Typography variant="h5">
        Two Column Table/Key Value Pair Table
      </Typography>
      <KeyValueTable title="Health Information" rows={healthInformationRows} />

      <Typography variant="h5">Dialog</Typography>
      <CustomButton onClick={() => setDialogOpen(true)}>
        Open Dialog
      </CustomButton>
      <CustomDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={
          <Typography sx={{ color: "#063E6F", fontWeight: 800, textTransform: "uppercase", fontSize: "20px"}}>Set Break Time</Typography>
        }
        contentSx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        actionsSx={{
          justifyContent: "center",
          pb: 2,
        }}
        actions={
          <CustomButton
            onClick={() => setDialogOpen(false)}
            sx={{ borderRadius: "50px", paddingX: "40px" }}
          >
            Confirm
          </CustomButton>
        }
      >
        <Typography>Break Duration</Typography>
        <FormControl fullWidth>
          <Select
            value={duration || ""}
            displayEmpty
            onChange={(e) => setDuration(Number(e.target.value))}
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "#9ca3af" }}>Select</span>;
              }
              return `${selected} minutes`;
            }}
            sx={{
              height: 40,
              borderRadius: "8px",
              backgroundColor: "#fff",
              "& .MuiSelect-select": {
                px: 2,
                py: 1,
              },
            }}
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value={15}>15 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={45}>45 minutes</MenuItem>
            <MenuItem value={60}>60 minutes</MenuItem>
            <MenuItem value={90}>90 minutes</MenuItem>
            <MenuItem value={120}>120 minutes</MenuItem>
          </Select>
        </FormControl>

        <Typography>Break Reason</Typography>

        <FormControl fullWidth>
          <Select
            value={reason || ""}
            displayEmpty
            onChange={(e) => setReason(e.target.value)}
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "#9ca3af" }}>Select</span>;
              }

              const selectedOption = reasonOptions.find(
                (opt) => opt.value === selected,
              );

              return selectedOption?.label || selected;
            }}
            sx={{
              height: 40,
              borderRadius: "8px",
              backgroundColor: "#fff",
              "& .MuiSelect-select": {
                px: 2,
                py: 1,
              },
            }}
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            {reasonOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CustomDialog>
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<CustomComponents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/drs" element={<DRS />} />
        <Route
          path="/drs/medicals"
          element={<MedicalRiskAnalytics applicationNo="" ntid="" />}
        />
      </Routes>
    </>
  );
}

export default App;
