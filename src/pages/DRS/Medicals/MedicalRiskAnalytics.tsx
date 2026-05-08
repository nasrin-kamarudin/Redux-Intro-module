import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../../component/layout/Header";
import { centerFlex } from "../../../utils/styles";
import CustomButton from "../../../component/ui/Button/Button";
import { KeyLeftArrowIcon } from "../../../icons/Icons";
import { useNavigate } from "react-router-dom";
import BreMedical from "./BreMedical";
import { getUdsDocuments } from "../../../api/dataTableApi";
import CompleteBloodCount from "./CompleteBloodCount";
import LipidProfileTable from "./LipidProfile";
import LiverFunctionTest from "./LiverFunctionTest";
import ExpandAllLink from "./ExpandAllLink";

type MedicalRiskAnalyticsProps = {
  applicationNo: string;
  ntid: string;
};

  const MedicalRiskAnalytics = ({
    applicationNo,
    ntid,
  }: MedicalRiskAnalyticsProps) => {
    const navigate = useNavigate();
    const [isLoadingUds, setIsLoadingUds] = useState(false);
    const [expandedAccordions, setExpandedAccordions] = useState({
    cbc: false,
    lipid: false,
    lft: false,
  });

  const handleExpandAll = () => {
    setExpandedAccordions({ cbc: true, lipid: true, lft: true });
  };

  const handleCollapseAll = () => {
    setExpandedAccordions({ cbc: false, lipid: false, lft: false });
  };

  const handleCbcChange = (expanded: boolean) => {
    setExpandedAccordions((prev) => ({ ...prev, cbc: expanded }));
  };

  const handleLipidChange = (expanded: boolean) => {
    setExpandedAccordions((prev) => ({ ...prev, lipid: expanded }));
  };

  const handleLftChange = (expanded: boolean) => {
    setExpandedAccordions((prev) => ({ ...prev, lft: expanded }));
  };

  const isAllExpanded = Object.values(expandedAccordions).every((v) => v);

  const handleViewUdsDocuments = async () => {
    setIsLoadingUds(true);
    try {
      console.log("UDS API response for applicationNo:", applicationNo, "ntid:", ntid);
      const response = await getUdsDocuments("APP123456", "NTID12345");
      console.log("UDS API response:", response);
      if (response.url) {
        setIsLoadingUds(false);
        window.open(response.url, "_blank");
      }
    } catch (error) {
      console.error("Error fetching UDS documents:", error);
      alert("Failed to fetch UDS documents");
    } 
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          ...centerFlex,
          flexDirection: "column",
          backgroundColor: "#F0F3F8",
          overflowX: "hidden"
        }}
      >
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mt: 2, ml: 8, mr: 3, mb: 0,  
          width: "100%",
            }}>
          <CustomButton
            variant="text"
            size="small"
            onClick={() => navigate("/inbox")}
            sx={{ textTransform: "none", minWidth: 42, display: "flex", alignItems: "center", gap: 0.5, color: "#B02A30", fontWeight: 700 }}
          >
            <KeyLeftArrowIcon width={16} height={16} />
            Back
          </CustomButton>

          <CustomButton
              variant="outlined"
              onClick={handleViewUdsDocuments}
              disabled={isLoadingUds}
              sx={{
                borderColor: "#B02A30",
                color: "#B02A30",
                fontWeight: 700,
                fontSize: "13px",
                borderRadius: "50px",
                fontFamily: "Mulish, sans-serif",
                display: "flex", 
                justifyContent: "flex-end",
                mr: 6,
              }}
            >
              {isLoadingUds ? "Loading..." : "View UDS Documents"}
          </CustomButton>
        </Box>

        <BreMedical />
        <>
          <ExpandAllLink
            onExpandAll={handleExpandAll}
            onCollapseAll={handleCollapseAll}
            isAllExpanded={isAllExpanded}
          />
              <CompleteBloodCount expanded={expandedAccordions.cbc} onExpandedChange={handleCbcChange} />
              <LipidProfileTable expanded={expandedAccordions.lipid} onExpandedChange={handleLipidChange} />
              <LiverFunctionTest expanded={expandedAccordions.lft} onExpandedChange={handleLftChange} />
        </>
      </Box>
    </>
  );
};

export default MedicalRiskAnalytics;
