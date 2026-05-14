import { useState } from "react";
import type { PoolProps, tableData } from "../../types/inbox.types";
import { Box, List, Paper, Typography } from "@mui/material";
import {
  InboxIcon,
  KeyRightArrowIcon,
  MenuIcon,
  TaskIcon,
} from "../../icons/Icons";
import { columnFlex, hoverSx, selectedSx } from "../../utils/styles";
import { mockWorkPoolsData } from "../../../mocks/workPoolsMock";

const data = mockWorkPoolsData;

const workPools = ["1st UW Pool", "Sr. UW Pool", "CMO Pool"];
const roleMap: Record<string, string> = {
  "1st UW Pool": "1st UW",
  "Sr. UW Pool": "Sr. UW",
  "CMO Pool": "CMO UW",
};

const sectionTitleSx = {
  color: "#5D5D5D",
  fontWeight: 800,
  pl: 2,
  pb: 1,
  textTransform: "uppercase",
};

type PoolItemProps = {
  label: string;
  value: string;
  selectedPool: string;
  onClick: (val: string) => void;
  count: number;
};

const PoolItem = ({
  label,
  value,
  selectedPool,
  onClick,
  count,
}: PoolItemProps) => {
  const isSelected = selectedPool === value;

  return (
    <Box
      onClick={() => onClick(value)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        mb: 1,
        pl: label !== "All Cases" ? 4 : 2,
        ...(isSelected ? selectedSx : hoverSx),
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: isSelected ? "#9A2529" : "#999999",
        }}
      >
        {label} ({count})
      </Typography>

      {isSelected && <KeyRightArrowIcon style={{ color: "#9A2529" }} />}
    </Box>
  );
};

const LeftPanel = ({
  onSelectPool,
  selectedPool,
  toggle,
  setToggle,
}: PoolProps) => {
  const [rows] = useState<tableData[]>(data);

  const getCount = (pool: string) => {
    if (pool === "All Cases") return rows.length;

    const role = roleMap[pool];
    return rows.filter((row) => row.roleType === role).length;
  };

  return (
    <Box
      sx={{
        width: toggle ? "64px" : "250px",
        backgroundColor: "#fff",
        transition: "all 0.3s",
        overflow: "hidden",
      }}
    >
      <Paper sx={{ height: "100%" }}>
        <Box sx={{ pl: 2, py: 2 }}>
          <Box
            onClick={() => setToggle((prev) => !prev)}
            sx={{ cursor: "pointer" }}
          >
            <MenuIcon />
          </Box>
        </Box>

        {toggle ? (
          <Box
            sx={{
              ...columnFlex,
              gap: 4,
              padding: 2,
            }}
          >
            <InboxIcon />
            <TaskIcon />
          </Box>
        ) : (
          <>
            {/* INBOX */}
            <Typography sx={sectionTitleSx}>inbox - work pools</Typography>

            {/* ALL CASES */}
            {/* <PoolItem
              label="All Cases"
              value="All Cases"
              selectedPool={selectedPool}
              onClick={onSelectPool}
              count={getCount("All Cases")}
            /> */}

            {/* WORK POOLS */}

            {/* <Typography sx={sectionTitleSx}>work pools</Typography> */}

            <List disablePadding>
              {workPools.map((pool) => (
                <PoolItem
                  key={pool}
                  label={roleMap[pool] ?? pool}
                  value={pool}
                  selectedPool={selectedPool}
                  onClick={onSelectPool}
                  count={getCount(pool)}
                />
              ))}
            </List>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LeftPanel;
