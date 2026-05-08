import { Box, Container } from "@mui/material";
import Header from "../../component/layout/Header";
import { centerFlex } from "../../utils/styles";
import CustomButton from "../../component/ui/Button/Button";
import { KeyLeftArrowIcon } from "../../icons/Icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleMedicalsPanel } from "../../store/slices/drsSlice";
import type { RootState } from "../../store/store";
import ApplicationJourney from "./ApplicationJourney";
import BreDecision from "./BreDecision";
import Summary from "./Summary";
import UWToolkit from "./UWToolkit";

const DRS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select medicals data from Redux store
  const medicals = useSelector((state: RootState) => state.drs.medicals);
  const medicalsPanelOpen = useSelector(
    (state: RootState) => state.drs.medicalsPanelOpen
  );

  const handleToggleMedicalsPanel = () => {
    dispatch(toggleMedicalsPanel());
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
        <Container disableGutters maxWidth={false} sx={{ ml: 3 }}>
          <CustomButton
            variant="text"
            size="small"
            onClick={() => navigate("/inbox")}
            sx={{ textTransform: "none", minWidth: 42 }}
          >
            <KeyLeftArrowIcon />
            Back
          </CustomButton>
        </Container>
        <ApplicationJourney />
        <BreDecision />
        <Summary />
        <UWToolkit />
      </Box>
    </>
  );
};

export default DRS;
