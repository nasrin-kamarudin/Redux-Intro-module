import { Box, Divider, Typography } from "@mui/material";
import { KeyRightArrowIcon } from "../../icons/Icons";
import { columnFlex } from "../../utils/styles";

const quickLinks = [
  "Proposal Form",
  "View Medicals",
  "Previous Policies",
  "Financial Details",
  "Open Tasks",
  "Risk Details",
  "Audit Trail",
];

const QuickLinks = () => {
  return (
    <Box
      sx={{
        width: "276px",
        ...columnFlex,
        gap: 2,
      }}
    >
      {/* Quick Links*/}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1e1e1e",
            px: 2,
            py: 1.5,
          }}
        >
          Quick Links
        </Typography>
        <Divider sx={{ bgcolor: "#E6E6E6" }} />
        {quickLinks.map((link, index) => (
          <Box key={link}>
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: "16px",
                  color: "#444",
                }}
              >
                {link}
              </Typography>
              <KeyRightArrowIcon />
            </Box>
            {index < quickLinks.length - 1 && (
              <Divider sx={{ bgcolor: "#E6E6E6" }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default QuickLinks;
