import { useState } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const Landing = () => {
  // const [selectedPool, setSelectedPool] = useState<string>("All Cases");
  const [selectedPool, setSelectedPool] = useState<string>("");

  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Grid container sx={{ flexWrap: "nowrap" }} className="bg-grey-200">
      <LeftPanel
        selectedPool={selectedPool}
        toggle={toggle}
        setToggle={setToggle}
        onSelectPool={setSelectedPool}
      />
      <Box sx={{ flex: 1 }}>
        <RightPanel selectedPool={selectedPool} />
      </Box>
    </Grid>
  );
};

export default Landing;
