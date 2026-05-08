import {
  Box,
  Button,
  Divider,
  FormControl,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Logo from "../../assets/ICICI-Logo.svg";
import AxiomLogo from "../../assets/Axiom Logo.svg";
import { useState } from "react";
import {
  KeyDownArrowIcon,
  KeyRightArrowIcon,
  KeyUpArrowIcon,
  LogoutIcon,
  TimerPauseIcon,
  UserProfileIcon,
} from "../../icons/Icons";
import CustomDialog from "../ui/Dialog/Dialog";
import CustomButton from "../ui/Button/Button";

const reasonOptions = [
  { value: "tea", label: "Tea / Coffee Break" },
  { value: "lunch", label: "Lunch Break" },
  { value: "personal", label: "Personal Work" },
  { value: "meeting", label: "Internal Meeting" },
  { value: "system", label: "System Issue" },
];

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>();
  const [reason, setReason] = useState<string>("");

  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null,
  );
  const isUserMenuOpen = Boolean(userMenuAnchor);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          backgroundColor: "#fff",
          boxShadow: 1,
        }}
      >
        {/* LEFT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
          <Box component="img" src={Logo} alt="ICICI Prudential Logo" />

          <Box sx={{ width: "1px", height: 32, backgroundColor: "#d1d5db" }} />

          <Box component="img" src={AxiomLogo} alt="Axiom Logo" />
        </Box>

        {/* RIGHT SECTION */}
        <Box>
          <Button onClick={handleUserMenuOpen}>
            {/* USER ICON */}
            <Box
              sx={{
                mr: 1,
                p: 0.5,
                px: 1,
                backgroundColor: "#fff2ed",
                borderRadius: "50%",
              }}
            >
              <Box sx={{ color: "#9A2529", mt: 0.5 }}>
                <UserProfileIcon />
              </Box>
            </Box>

            {/* USER INFO */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                mr: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#9A2529",
                }}
              >
                Sunil Sharma
              </Typography>
              <Typography sx={{ color: "#323232", fontSize: 10 }}>
                UW1234
              </Typography>
            </Box>

            {/* ARROW */}
            {isUserMenuOpen ? (
              <Box sx={{ color: "#9A2529" }}>
                <KeyUpArrowIcon />
              </Box>
            ) : (
              <Box sx={{ color: "#9A2529" }}>
                <KeyDownArrowIcon />
              </Box>
            )}
          </Button>

          <Menu
            id="user-menu"
            anchorEl={userMenuAnchor}
            open={isUserMenuOpen}
            onClose={handleUserMenuClose}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: 2,
                  boxShadow: 3,
                  width: 240,
                  overflow: "hidden",
                },
              },
            }}
          >
            {/* BREAK TIME */}
            <Box
              onClick={() => {
                handleUserMenuClose();
                setDialogOpen(true);
              }}
              sx={{
                px: 2,
                py: 1,
                mt: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <TimerPauseIcon />
                  <Typography>Breaktime</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#063E6F",
                      fontSize: 12,
                    }}
                  >
                    30 mins
                  </Typography>
                  <KeyRightArrowIcon />
                  {/* <KeyDownArrowIcon /> */}
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* LOGOUT */}
            <Box
              sx={{
                px: 2,
                py: 1,
                mt: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LogoutIcon />
                <Typography>Logout</Typography>
              </Box>
            </Box>
          </Menu>
        </Box>
      </Box>

      <CustomDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={
          <Typography
            sx={{
              color: "#063E6F",
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "20px",
            }}
          >
            Set Break Time
          </Typography>
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
    </Box>
  );
};

export default Header;
